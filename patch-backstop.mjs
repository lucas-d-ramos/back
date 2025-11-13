// Patch BackstopJS to use our Vercel-compatible Puppeteer
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const backstopPuppetPath = './node_modules/backstopjs/core/util/runPuppet.js';
const puppeteerWrapperPath = resolve(__dirname, 'puppeteer-vercel.js');

try {
  let content = readFileSync(backstopPuppetPath, 'utf8');

  // Replace puppeteer import with our wrapper using absolute path
  if (!content.includes('puppeteer-vercel')) {
    // Use forward slashes for cross-platform compatibility
    const normalizedPath = puppeteerWrapperPath.replace(/\\/g, '/');

    content = content.replace(
      "const puppeteer = require('puppeteer');",
      `const puppeteer = require('${normalizedPath}');`
    );

    content = content.replace(
      'const puppeteer = require("puppeteer");',
      `const puppeteer = require('${normalizedPath}');`
    );

    writeFileSync(backstopPuppetPath, content);
    console.log('✅ BackstopJS patched successfully for Vercel!');
    console.log(`   Using wrapper at: ${normalizedPath}`);
  } else {
    console.log('✅ BackstopJS already patched');
  }
} catch (error) {
  console.log('⚠️  Could not patch BackstopJS:', error.message);
  console.log('   This is OK if running locally');
}
