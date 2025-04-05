import{test, expect} from "@playwright/test"

test("multi tab", async({browser})=>{


  const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();


await page1.goto("https://amazon.com/");
await page2.goto("https://www.flipkart.com/");  /// automatically this tab will focus

await page1.bringToFront(); // this to focus on tabs


})