// Helper script to get the chromium executable path on Vercel
import chromium from '@sparticuz/chromium';

const executablePath = await chromium.executablePath();
console.log(executablePath);
