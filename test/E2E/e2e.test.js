const puppeteer = require('puppeteer');

async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/test/E2E/mysite.html');
    await page.type("input[id=email]", "test@email.com");
    await page.type('input[id=password]', 'password');
    await Promise.all([
      page.click('input[id=submit]'),
      page.waitForNavigation(),
    ]);
    await browser.close();
  } catch (error) {
    console.error('حدث خطأ:', error);
  }
}

main();