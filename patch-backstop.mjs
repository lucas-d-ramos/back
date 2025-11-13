// Patch BackstopJS to use our Vercel-compatible Puppeteer
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const backstopPuppetPath = './node_modules/backstopjs/core/util/runPuppet.js';
const puppeteerWrapperPath = resolve(__dirname, 'puppeteer-vercel.js');

try {
  let content = readFileSync(backstopPuppetPath, 'utf8');
  const normalizedPath = puppeteerWrapperPath.replace(/\\/g, '/');

  // First, restore original if already patched (to handle path changes)
  content = content.replace(
    /const puppeteer = require\('.*puppeteer-vercel\.js'\);/g,
    "const puppeteer = require('puppeteer');"
  );
  content = content.replace(
    /const puppeteer = require\(".*puppeteer-vercel\.js"\);/g,
    "const puppeteer = require('puppeteer');"
  );

  // Now apply the patch with the correct absolute path
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
} catch (error) {
  console.log('⚠️  Could not patch BackstopJS:', error.message);
  console.log('   This is OK if running locally');
}
