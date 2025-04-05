
import {test, expect} from "@playwright/test";

test("Client test", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("vsai777333@gmail.com");
    await page.locator("#userPassword").fill("Password@7");
    await page.locator("#login").click();
   // await page.waitForLoadState("networkidle");
   await page.locator(".card-body b").first().waitFor();
    const  items = await page.locator(".card-body b").allTextContents();//return all texts
    console.log(items);
}

)