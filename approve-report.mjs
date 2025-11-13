import fs from "fs";
import path from "path";
import { execFile } from "child_process";

const REPORT_BASE = "https://wemove-frontend-tests.netlify.app/json_report";
// for local yarn serve
// const REPORT_BASE = "http://127.0.0.1:3000/actionkit/reports/json_report"
const REFERENCE_BASE = "actionkit/reports/bitmaps_reference";

const getFailed = async () => {
  const r = await fetch(`${REPORT_BASE}/jsonReport.json`);
  const tests = (await r.json()).tests;

  return tests.filter((test) => test.status === "fail").map(({ pair }) => pair);
};

const approve = async (failed) => {
  const files = [];
  for (const failedTest of failed) {
    const img = await fetch(path.join(REPORT_BASE, failedTest.test));

    const out = path.join(REFERENCE_BASE, failedTest.reference);

    if (!out.startsWith(REFERENCE_BASE)) {
      throw new Error(`Invalid reference path: ${out}`);
    }

    const outFile = fs.createWriteStream(out);

    const imgBlob = await img.blob();
    const imgBuf = await imgBlob.arrayBuffer();

    await outFile.write(Buffer.from(imgBuf));
    files.push(out);

    console.log(`Approving ${out}`);
  }

  return files;
};

const commit = async (files) => {
  if (files.length === 0) return false;

  const msg = "Approve new reference images";

  await execFile("git", ["commit", "-m", msg].concat(files), (err) => {
    if (err) {
      console.error(err);
      throw new Error(err);
    }
  });

  await execFile("git", ["push"], (err) => {
    if (err) {
      console.error(err);
      throw new Error(err);
    }
  });

  return true;
};

getFailed().then(approve).then(commit);
