const puppeteer = require('puppeteer-core');

module.exports = async () => {
  let executablePath;

  if (process.env.VERCEL) {
    const chromium = require('@sparticuz/chromium');
    executablePath = await chromium.executablePath();
  }

  return puppeteer.launch({
    executablePath,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
    headless: true,
  });
};
