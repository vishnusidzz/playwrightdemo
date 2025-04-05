// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  

  const errorBlock = page.locator("[style*='block']");
  const signInButton = page.locator("#signInBtn");
  const UserName = page.locator('input#username');
  const Password = page.locator("[type='password']");

//css and xpath

await UserName.fill("helo");
await Password.fill("pass");
await signInButton.click();
 console.log (await errorBlock.textContent());

 await expect(errorBlock).toContainText('Incorrect username/password.');
 //entering correct detais

 await UserName.fill(""); // to clear existing input
 await UserName.fill("rahulshettyacademy");
 await Password.fill("learning");
 await signInButton.click();

// next page grab 1st item name
const itemTxt = await page.locator(".card-body a");
 console.log(await itemTxt.first().textContent());
 console.log(await itemTxt.nth(1).textContent());

 console.log(await itemTxt.allTextContents());



  // Expect a title "to contain" a substring.
 // await expect(page).toHaveTitle(/Playwright/);
});


