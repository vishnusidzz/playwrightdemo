import {test , expect} from "@playwright/test";

test("Calander function", async ({page})=>{

    const depatureDate = "27";
    const arraivalDate = "13";
    const noOfDays = await page.locator(".box .days");
    const count  = await noOfDays.count();
    await page.goto("https://www.easemytrip.com/");
    await page.locator("#ddate").click();
  
    await noOfDays.first().waitFor();
    await console.log(noOfDays.count());

    for(let i=0;i<=count;++i)
    {
       await  console.log(noOfDays.locator(".bor-d61 li").nth(i).textContent());
        if(await noOfDays.locator(".bor-d61 li").nth(i).textContent()===depatureDate)
        {
            await noOfDays.nth(i).locator(".bor-d61 li").click();
        }
    }
   await expect(page.locator("#dday")).toContainText("Thursday");
   await expect(page.locator("#ddayno")).toContainText(depatureDate);

})