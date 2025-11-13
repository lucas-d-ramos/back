import axios from "axios";
import fs from "fs";

const getMessage = (reportFile) => {
  const results = getResults(reportFile);

  let msgStat = "All tests passed";

  const testsCount = results.tests.length;
  const errorsCount = results.errors.length;

  if (errorsCount / testsCount > 0.5) {
    msgStat = `*Many tests failed: * ${errorsCount}/${testsCount}`;
  } else if (errorsCount > 0) {
    msgStat = `*Some tests failed: * ${errorsCount}/${testsCount}`;
  }

  const emoji = errorsCount > 0 ? ":poop:" : ":white_check_mark:";
  const failedTests = getFailedTests(results.errors);

  return JSON.stringify({
    text: ` -----------------------------------
  ${emoji} *Frontend tests results* ${emoji}
  -----------------------------------
  ${msgStat}
  [Full report](https://wemove-frontend-tests.netlify.app)
  ${failedTests}`,
  });
};

const getFailedTests = (failedTests) => {
  if (failedTests.length === 0) {
    return "";
  }

  let msg = `
    \`Broken scenarios:\``;

  const brokenPages = {};

  failedTests.forEach((failedTest) => {
    let pageType = failedTest.pair.label.substring(
      0,
      failedTest.pair.label.indexOf("-")
    );

    pageType = pageType !== "" ? pageType : failedTest.pair.label;

    const errorsCountByPageType =
      typeof brokenPages[pageType] === "undefined"
        ? 1
        : brokenPages[pageType] + 1;

    brokenPages[pageType] = errorsCountByPageType;
  });

  for (const [key, value] of Object.entries(brokenPages)) {
    msg =
      msg +
      `
    \`- ${key.charAt(0).toUpperCase() + key.slice(1)} x${value}\``;
  }

  return msg;
};

const getResults = (filename) => {
  const file = fs.readFileSync(filename, "utf8");
  const tests = JSON.parse(file).tests;

  return {
    tests: tests,
    errors: tests.filter((test) => test.status === "fail"),
  };
};

const sendMessage = async (reportFile) => {
  console.log(process.argv[2]);
  const messageJSON = getMessage(reportFile);

  console.log(messageJSON);

  await axios.post(
    "https://hooks.slack.com/services/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",
    messageJSON
  );
};

if (process.argv.length < 3) {
  console.log("Usage: node slack-report.mjs <report.json>");
  process.exit(1);
}

await sendMessage(process.argv[2]);
process.exit(0);
