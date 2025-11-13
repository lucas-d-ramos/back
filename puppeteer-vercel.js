// Wrapper around puppeteer-core that configures it for Vercel
const puppeteerCore = require('puppeteer-core');

// Override the launch method to use chrome-aws-lambda when on Vercel
const originalLaunch = puppeteerCore.launch;

puppeteerCore.launch = async function(options = {}) {
  if (process.env.VERCEL) {
    console.log('[Puppeteer Wrapper] Detected Vercel environment');

    // Try chrome-aws-lambda first - it's better supported on Vercel
    try {
      const chromeLambda = require('chrome-aws-lambda');
      console.log('[Puppeteer Wrapper] Using chrome-aws-lambda');

      const executablePath = await chromeLambda.executablePath;
      console.log('[Puppeteer Wrapper] Chrome path:', executablePath);

      const vercelOptions = {
        ...options,
        executablePath,
        args: [...chromeLambda.args, ...(options.args || [])],
        headless: chromeLambda.headless,
      };

      console.log('[Puppeteer Wrapper] Launching browser with chrome-aws-lambda...');
      return originalLaunch.call(this, vercelOptions);

    } catch (chromeLambdaError) {
      console.log('[Puppeteer Wrapper] chrome-aws-lambda failed, trying @sparticuz/chromium:', chromeLambdaError.message);

      // Fallback to @sparticuz/chromium
      const chromium = require('@sparticuz/chromium');

      // Set font config before extracting
      if (chromium.font) {
        await chromium.font('/tmp/fonts/NotoColorEmoji.ttf');
        console.log('[Puppeteer Wrapper] Font configured');
      }

      const executablePath = await chromium.executablePath();
      console.log('[Puppeteer Wrapper] Using Chromium at:', executablePath);

      // Set LD_LIBRARY_PATH
      const libPaths = [
        '/tmp',
        '/tmp/swiftshader',
        process.env.LD_LIBRARY_PATH || ''
      ].filter(Boolean).join(':');

      process.env.LD_LIBRARY_PATH = libPaths;
      console.log('[Puppeteer Wrapper] Set LD_LIBRARY_PATH to:', libPaths);

      const vercelOptions = {
        ...options,
        executablePath,
        args: [...(chromium.args || []), ...(options.args || [])],
        headless: chromium.headless ?? options.headless ?? true,
      };

      console.log('[Puppeteer Wrapper] Launching browser with @sparticuz/chromium...');
      return originalLaunch.call(this, vercelOptions);
    }
  }

  // Not on Vercel, use default behavior
  return originalLaunch.call(this, options);
};

module.exports = puppeteerCore;
