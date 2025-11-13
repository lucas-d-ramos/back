module.exports = async () => {
  console.log('[Custom Launcher] Starting browser launch...');
  console.log('[Custom Launcher] VERCEL env:', process.env.VERCEL);

  if (process.env.VERCEL) {
    // On Vercel, use puppeteer-core with @sparticuz/chromium
    const puppeteer = require('puppeteer-core');
    const chromium = require('@sparticuz/chromium');

    const execPath = await chromium.executablePath();
    console.log('[Custom Launcher] Chromium path:', execPath);
    console.log('[Custom Launcher] Chromium args:', chromium.args);

    const browser = await puppeteer.launch({
      executablePath: execPath,
      args: chromium.args,
      headless: chromium.headless,
    });

    console.log('[Custom Launcher] Browser launched successfully!');
    return browser;
  } else {
    // Locally, let BackstopJS handle browser launching with default puppeteer
    console.log('[Custom Launcher] Local environment, using default');
    return null;
  }
};
