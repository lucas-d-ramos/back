// Wrapper around puppeteer-core that configures it for Vercel
const puppeteerCore = require('puppeteer-core');
const { spawn } = require('child_process');

// Override the launch method to use @sparticuz/chromium when on Vercel
const originalLaunch = puppeteerCore.launch;

puppeteerCore.launch = async function(options = {}) {
  if (process.env.VERCEL) {
    console.log('[Puppeteer Wrapper] Detected Vercel environment');
    const chromium = require('@sparticuz/chromium');

    // Get executable path - this extracts the Chromium binary
    const executablePath = await chromium.executablePath();
    console.log('[Puppeteer Wrapper] Chromium binary at:', executablePath);

    // Check if binary exists and test it
    try {
      const { promisify } = require('util');
      const execFile = promisify(require('child_process').execFile);

      // Try to get version to verify libraries are accessible
      console.log('[Puppeteer Wrapper] Testing Chromium binary...');
      const { stdout, stderr } = await execFile(executablePath, ['--version'], {
        timeout: 5000
      });
      console.log('[Puppeteer Wrapper] Chromium version:', stdout.trim());
    } catch (testError) {
      console.log('[Puppeteer Wrapper] Binary test failed:', testError.message);

      // Check what libraries are missing
      try {
        const lddResult = await new Promise((resolve) => {
          const proc = spawn('ldd', [executablePath]);
          let output = '';
          proc.stdout.on('data', (data) => output += data);
          proc.stderr.on('data', (data) => output += data);
          proc.on('close', () => resolve(output));
        });
        console.log('[Puppeteer Wrapper] Missing libraries (ldd check):',
          lddResult.split('\n').filter(line => line.includes('not found')).join(', '));
      } catch (lddError) {
        console.log('[Puppeteer Wrapper] Could not run ldd check');
      }
    }

    // Set LD_LIBRARY_PATH to help find shared libraries
    // @sparticuz/chromium stores libraries in node_modules
    const path = require('path');
    const chromiumLibPath = path.join(
      require.resolve('@sparticuz/chromium'),
      '../..',
      'lib'
    );

    const libPaths = [
      chromiumLibPath,
      '/tmp',
      '/tmp/swiftshader',
      process.env.LD_LIBRARY_PATH || ''
    ].filter(Boolean).join(':');

    process.env.LD_LIBRARY_PATH = libPaths;
    console.log('[Puppeteer Wrapper] Chromium lib path:', chromiumLibPath);
    console.log('[Puppeteer Wrapper] Set LD_LIBRARY_PATH to:', libPaths);

    // Check if NSS libraries exist
    const fs = require('fs');
    try {
      const libFiles = fs.readdirSync(chromiumLibPath);
      console.log('[Puppeteer Wrapper] Files in lib directory:', libFiles.join(', '));
      const hasNss = libFiles.some(f => f.includes('libnss'));
      console.log('[Puppeteer Wrapper] NSS libraries found:', hasNss);
    } catch (fsError) {
      console.log('[Puppeteer Wrapper] Could not read lib directory:', fsError.message);
    }

    // Merge options with Vercel-specific configuration
    const vercelOptions = {
      ...options,
      executablePath,
      args: [...(chromium.args || []), ...(options.args || [])],
      headless: chromium.headless ?? options.headless ?? true,
    };

    console.log('[Puppeteer Wrapper] Launching browser...');
    return originalLaunch.call(this, vercelOptions);
  }

  // Not on Vercel, use default behavior
  return originalLaunch.call(this, options);
};

module.exports = puppeteerCore;
