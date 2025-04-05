import {test, expect} from "@playwright/test"

test("SPecial Locators", async ({page})=>{

await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").click();
await page.getByLabel("Gender").selectOption("Female");
await page.getByPlaceholder("Password").fill("helllo");
await page.getByRole("button", {name : "submit"}).click();

await page.getByRole("link", {name : "Shop"}).click();
await page.locator("app-card").filter({hasText : "Nokia Edge"}).getByRole("button", ({name : "Add "})).click();
// getbylable is not recommended to type
})
test ("client website", async ({page})=>{

    const email = "vsai777333@gmail.com";
    const password = "Password@7";

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill(password);
    await page.getByRole("button", ({name: "login"})).click();
    

    const AllProducts = page.locator(".card-body");
   
    const ProductName = "ZARA COAT 3";
    const productaddedMessage = page.locator(".toast-message");
    const productCount =await AllProducts.count();

    await page.locator(".card").filter({hasText : "ZARA COAT 3"}).getByRole("button" , ({name : "Add To Cart"})).click();
    page.getByRole("button", )
    //await page.pause();
    // await page.productaddedMessage.waitFor();
    // await expect(productaddedMessage).toHaveText(" Product Added To Cart ");

    //at cart page
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    await page.locator(".cartSection h3");
    const bool =  await page.locator("h3:has-text(\""+ProductName+"\")").isVisible();
    await  expect(bool).toBeTruthy();
    await page.getByRole("button", ({name:"  Checkout "})).click();

   // await page.locator("Text=Credit Card").click();

    await page.locator("input[value='4542 9931 9292 2293']").clear();
    await page.locator("input[value='4542 9931 9292 2293']").fill("123456789123");

    const ExpiryMonthCC = page.locator("select[class='input ddl']").first();
    const ExpiryDayCC = page.locator("select[class='input ddl']").nth(1);
    await ExpiryMonthCC.selectOption("05");
    await ExpiryDayCC.selectOption("11");
   

    await page.locator("input[type='text']").nth(1).fill("123");
    await page.locator("input[type='text']").nth(2).fill("Vishnu");
    // await page.locator("input[name='coupon']").fill("RahulShetty");
    // await page.locator("button[type='submit']").click();


    await page.locator("input[placeholder*='Country']").pressSequentially("ind");


    const no_DropDowns = page.locator(".ta-results");
    await no_DropDowns.waitFor();
    const count  = await no_DropDowns.locator("button").count();
    
    for(let i=0;i<count;++i)
    
    {
        const text = await no_DropDowns.locator("button").nth(i).textContent();
        if( text ===" India")
        {
           await no_DropDowns.locator("button").nth(i).click();

           page.screenshot();
           break;
        }
    }

    //verify email is correct

    
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    await page.getByText("Place Order ").click();
   
    await console.log("now cursor here");
    page.locator(".hero-primary").waitFor();
    
    await expect(page.getByText(" Thankyou for the order. ").isVisible()).toBeTruthy();
    
    const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    console.log(orderid);

    const editOrderId = orderid.split(" ");
    const ReqOrderId = editOrderId[2].trim();
    
   

    await page.getByRole("button", ({name: "  ORDERS"})).click();

    // check orderid inside the orders table
    await page.locator(".ng-star-inserted").first().waitFor();

    const rows =  await page.locator("tbody tr");
    const rowsCount = await rows.count();
    const message =   await page.locator(".table-responsive .ng-star-inserted").last();
    await expect(message.isVisible()).toBeTruthy();
    await console.log(message.textContent());
   
        await page.locator("tbody tr",({ timeout: 60*1000 })).filter({hasText:ReqOrderId}).getByRole("button", ({name:"View"})).click();

     

    
      const out = await page.locator(".tagline").textContent();
     
     await expect(page.getByText(ReqOrderId).isVisible()).toBeTruthy();
      await console.log(out);
    // await page.pause();
    //input[type="text"]

})