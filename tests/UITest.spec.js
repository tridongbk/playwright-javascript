const { test, expect } = require('@playwright/test');

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

test('Incorrect username', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("#username").fill("incorrectUser");
    await page.locator("#password").fill("learning");
    await page.locator("#signInBtn").click();

    // wait for the error message to appear
    const errorMessage = await page.locator(".alert-danger").textContent();
    expect(errorMessage).toContain("Incorrect");
});

test('Add Blackberry to cart and verify', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("learning");
    await page.locator("#signInBtn").click();
    await page.waitForURL('**/shop');

    // Click the "Add" button for Blackberry
    const blackberryCard = page.locator('.card:has-text("Blackberry")');
    await blackberryCard.getByRole('button', { name: /add/i }).click();

    // click on the Checkout button (cart)
    await page.locator("a[class*='nav-link btn btn-primary']").click();

    // verify the cart contains the item
    const cartItem = await page.locator("//a[normalize-space()='Blackberry']").textContent();
    expect(cartItem).toContain("Blackberry");
});