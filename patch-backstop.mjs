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

  console.log('📝 Patching BackstopJS...');
  console.log(`   Wrapper path: ${normalizedPath}`);

  // Aggressively replace ANY require statement containing puppeteer
  // This handles both original and any previously patched versions
  content = content.replace(
    /const puppeteer = require\(['"](.*?puppeteer.*?)['"]\ ?\);?/g,
    `const puppeteer = require('${normalizedPath}');`
  );

  writeFileSync(backstopPuppetPath, content);
  console.log('✅ BackstopJS patched successfully for Vercel!');

  // Verify the patch
  const verifyContent = readFileSync(backstopPuppetPath, 'utf8');
  if (verifyContent.includes(normalizedPath)) {
    console.log('✅ Patch verified - correct path is in file');
  } else {
    console.log('⚠️  Warning: Could not verify patch');
  }
} catch (error) {
  console.log('⚠️  Could not patch BackstopJS:', error.message);
  console.log('   This is OK if running locally');
}
