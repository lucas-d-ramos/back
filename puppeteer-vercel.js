// Wrapper around puppeteer-core that configures it for Vercel
const puppeteerCore = require('puppeteer-core');
const { spawn } = require('child_process');

// Override the launch method to use @sparticuz/chromium when on Vercel
const originalLaunch = puppeteerCore.launch;

puppeteerCore.launch = async function(options = {}) {
  if (process.env.VERCEL) {
    console.log('[Puppeteer Wrapper] Detected Vercel environment');
    const chromium = require('@sparticuz/chromium');

    // Get executable path - this extracts the Chromium binary and libraries
    const executablePath = await chromium.executablePath();
    console.log('[Puppeteer Wrapper] Chromium binary at:', executablePath);

    // Check where libraries were extracted
    const fs = require('fs');
    const path = require('path');
    const tmpDirs = ['/tmp', '/tmp/al2', '/tmp/lib', '/tmp/al2/lib'];
    for (const dir of tmpDirs) {
      try {
        if (fs.existsSync(dir)) {
          const files = fs.readdirSync(dir);
          const libs = files.filter(f => f.endsWith('.so') || f.includes('libnss'));
          if (libs.length > 0) {
            console.log(`[Puppeteer Wrapper] Found ${libs.length} .so files in ${dir}:`, libs.slice(0, 5).join(', '));
          }
        }
      } catch (e) {
        // Ignore errors
      }
    }

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
    // @sparticuz/chromium extracts libraries to /tmp paths
    const libPaths = [
      '/tmp/al2/lib',  // AL2 runtime
      '/tmp/lib',      // Alternative path
      '/tmp',
      '/tmp/swiftshader',
      process.env.LD_LIBRARY_PATH || ''
    ].filter(Boolean).join(':');

    process.env.LD_LIBRARY_PATH = libPaths;
    console.log('[Puppeteer Wrapper] Set LD_LIBRARY_PATH to:', libPaths);

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
