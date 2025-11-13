module.exports = async () => {
  if (process.env.VERCEL) {
    // On Vercel, use puppeteer-core with @sparticuz/chromium
    const puppeteer = require('puppeteer-core');
    const chromium = require('@sparticuz/chromium');

    return puppeteer.launch({
      executablePath: await chromium.executablePath(),
      args: chromium.args,
      headless: chromium.headless,
    });
  } else {
    // Locally, let BackstopJS handle browser launching with default puppeteer
    // Return null to let BackstopJS use its default launcher
    return null;
  }
};
