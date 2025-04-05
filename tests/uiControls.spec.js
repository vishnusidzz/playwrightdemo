// @ts-check
import { test, expect } from '@playwright/test';

test('UI Controls', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  

  const errorBlock = page.locator("[style*='block']");
  const signInButton = page.locator("#signInBtn");
  const UserName = page.locator('input#username');
  const Password = page.locator("[type='password']");

  const dropdown = page.locator("select.form-control");
  const documentLink = page.locator("[href*='documents-request']");

//css and xpath
await dropdown.selectOption("teach");

await page.locator(".customradio").nth(1).click();
await page.locator("#okayBtn").click();
await expect( page.locator(".customradio").nth(1)).toBeChecked();
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
 expect(await page.locator("#terms").isChecked()).toBeFalsy();


 // to check value of attribute

 await expect(documentLink).toHaveAttribute("class","blinkingText");

//await page.pause();

 //entering correct detais


  // Expect a title "to contain" a substring.
 // await expect(page).toHaveTitle(/Playwright/);
});
//test.only will test that test case
test("open new page", async ({browser}) =>{

 const context = await browser.newContext();
 const page =  await context.newPage();

 const UserName = page.locator('input#username');

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const documentLink = page.locator("[href*='documents-request']");
const  [newPage]=await 
Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),]
   
    
      )
const text = await newPage.locator(".red").textContent();
   //console.log(await text.textContent());

  const arraytext = text?.split("@");
  // @ts-ignore
  const email = arraytext[1].split(" ")[0];
   console.log(email.toString());
   await UserName.fill(email);
await page.pause();
   const enteredEmail = await UserName.textContent();
   console.log(enteredEmail);
   

});


