// Patch BackstopJS to use our Vercel-compatible Puppeteer
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const backstopPuppetPath = './node_modules/backstopjs/core/util/runPuppet.js';

try {
  let content = readFileSync(backstopPuppetPath, 'utf8');

  // Replace puppeteer import with our wrapper
  if (!content.includes('puppeteer-vercel')) {
    content = content.replace(
      "const puppeteer = require('puppeteer');",
      "const puppeteer = require('../../puppeteer-vercel.js');"
    );

    content = content.replace(
      'const puppeteer = require("puppeteer");',
      'const puppeteer = require("../../puppeteer-vercel.js");'
    );

    writeFileSync(backstopPuppetPath, content);
    console.log('✅ BackstopJS patched successfully for Vercel!');
  } else {
    console.log('✅ BackstopJS already patched');
  }
} catch (error) {
  console.log('⚠️  Could not patch BackstopJS:', error.message);
  console.log('   This is OK if running locally');
}
