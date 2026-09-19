import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('pageerror', err => {
    console.error('PAGE ERROR:', err);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('CONSOLE ERROR:', msg.text());
    }
  });

  await page.goto('http://localhost:5174/');
  
  try {
    // Click the QR button
    await page.click('button:has-text("Scan to fill")');
    // Wait for the modal to pop up and QR code to render (500ms should be enough)
    await page.waitForTimeout(1000);
  } catch(e) {
    console.error("Test script failed", e);
  }

  await browser.close();
})();
