const { test, expect } = require('@playwright/test');

test.describe('test suite for client', () => {
  test('should display all items in the list', async ({ browser }) => {
    //log in as a client
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.fill('input[id="userEmail"]', 'tridong.bk@gmail.com');
    await page.fill('input[id="userPassword"]', '12345678x@X');
    await page.click('input[id="login"]');

    //wait for the page to load
    await page.waitForLoadState('networkidle');

    //check if the items are displayed
    const items = await page.locator('h5');
    const count = await items.count();
    // List all items
    for (let i = 0; i < count; i++) {
      const itemText = await items.nth(i).textContent();
      console.log(`Item ${i + 1}: ${itemText}`);
    }
    // Assert that items are displayed
    console.log(`Number of items displayed: ${count}`);
    expect(count).toBeGreaterThan(0);
  });
});