import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  const dimensions = await page.evaluate(() => {
    const getHeights = (el) => {
      let rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        id: el.id,
        className: el.className,
        height: rect.height,
        bottom: rect.bottom + window.scrollY
      };
    };

    const elements = Array.from(document.body.querySelectorAll('*'));
    return elements
      .map(getHeights)
      .filter(d => d.height > 1000)
      .sort((a, b) => b.bottom - a.bottom);
  });

  console.log("Page height:", await page.evaluate(() => document.documentElement.scrollHeight));
  console.log("Deepest elements:");
  console.log(dimensions.slice(0, 10));

  await browser.close();
})();
