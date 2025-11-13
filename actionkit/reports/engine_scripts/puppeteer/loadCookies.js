const fs = require('fs');

module.exports = async (page, scenario) => {
  let cookies = [];
  const cookiePath = scenario.cookiePath;

  // Read Cookies from File, if exists
  if (fs.existsSync(cookiePath)) {
    cookies = JSON.parse(fs.readFileSync(cookiePath));
  }

  // Add cookies to page (Puppeteer uses page.setCookie instead of browserContext.addCookies)
  if (cookies.length > 0) {
    await page.setCookie(...cookies);
  }

  console.log('Cookie state restored with:', JSON.stringify(cookies, null, 2));
};
