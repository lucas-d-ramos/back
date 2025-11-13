const utilities = require("./utilities/utilities");

module.exports = {
  id: "actionkit",
  viewports: utilities.getViewPorts(),
  onBeforeScript: "puppeteer/onBefore.js",
  onReadyScript: "puppeteer/onReady.js",
  scenarios: utilities.getScenarios(),
  paths: {
    bitmaps_reference: "actionkit/reports/bitmaps_reference",
    bitmaps_test: "actionkit/reports/bitmaps_test",
    engine_scripts: "actionkit/reports/engine_scripts",
    html_report: "actionkit/reports/html_report",
    ci_report: "actionkit/reports/ci_report",
    json_report: "actionkit/reports/json_report",
  },
  report: ["browser", "json"],
  engine: "puppeteer",
  scenarioDefaults: {
    delay: 3000,
  },
  engineOptions: {
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu"
    ],
    executablePath: process.env.VERCEL
      ? require("@sparticuz/chromium").executablePath
      : undefined,
  },
  fileNameTemplate: "{scenarioLabel}__{viewportLabel}",
  asyncCaptureLimit: 1,
  asyncCompareLimit: 1,
};
