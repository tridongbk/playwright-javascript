const { test, expect } = require('@playwright/test');

test('Page Google test', async ({ page }) => {
    await page.goto("https://google.com");
    // get the title - assertion
    const title = await page.title();
    console.log("Page title: " + title);
    expect(title).toBe("Google");
});

test('Browser Context Playwright test', async ({ browser }) => {
    // chrome - plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("learning");
    await page.locator("#signInBtn").click();
    // wait for navigation to the dashboard page
    await page.waitForURL('**/shop');
    // get the title - assertion
    const title = await page.title();
    await expect(title).toBe("ProtoCommerce");
});
