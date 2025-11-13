// Wrapper around puppeteer-core that configures it for Vercel
const puppeteerCore = require('puppeteer-core');

// Override the launch method to use @sparticuz/chromium when on Vercel
const originalLaunch = puppeteerCore.launch;

puppeteerCore.launch = async function(options = {}) {
  if (process.env.VERCEL) {
    console.log('[Puppeteer Wrapper] Detected Vercel environment');
    const chromium = require('@sparticuz/chromium');

    const executablePath = await chromium.executablePath();
    console.log('[Puppeteer Wrapper] Using Chromium at:', executablePath);

    // Merge options with Vercel-specific configuration
    const vercelOptions = {
      ...options,
      executablePath,
      args: [...(chromium.args || []), ...(options.args || [])],
      headless: chromium.headless ?? options.headless ?? true,
    };

    console.log('[Puppeteer Wrapper] Launching with args:', vercelOptions.args);
    return originalLaunch.call(this, vercelOptions);
  }

  // Not on Vercel, use default behavior
  return originalLaunch.call(this, options);
};

module.exports = puppeteerCore;
