import{test, expect} from "@playwright/test"

test("moreValidations",async({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await page.goto("https://www.amazon.in/");
await page.goBack();
await page.goForward();
await page.goBack();

await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();

page.on('dialog', dialog => dialog.accept());
await page.locator('#confirmbtn').click();
await page.locator("#mousehover").hover();

const framepage = await page.frameLocator("#courses-iframe");

await framepage.locator("li [href*='lifetime-access']:visible").click();
const noSub = await framepage.locator(".text span").textContent();
await console.log(noSub);




})