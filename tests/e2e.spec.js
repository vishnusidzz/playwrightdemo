import {test, expect} from "@playwright/test"

test("end to end order creation", async ({page})=>{

    const email = "vsai777333@gmail.com";
    const password = "Password@7";

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("#login").click();

    const AllProducts = await page.locator(".card-body");
   
    const ProductName = "ZARA COAT 3";
    const productaddedMessage = page.locator(".toast-message");
    const productCount =await AllProducts.count();

    AllProducts.filter()

    //await AllProducts.filter({hasText:"ZARA COAT 3"}).filter({has:page.getByRole("button", {name:' Add To Cart'})}).click();
    
    //await AllProducts.filter({hasText:"ZARA COAT 3"}).getByRole("button", ({name:" Add To Cart"})).click();

    for(let i=0;i<=productCount;++i)
    { 
       if(await AllProducts.nth(i).locator("b").textContent() === ProductName)
       {
       
            await AllProducts.nth(i).locator("text= Add To Cart").click();
            
            break;
       }
    }
   
    await productaddedMessage.waitFor();
    await expect(productaddedMessage).toHaveText(" Product Added To Cart ");

    //at cart page
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    await page.locator(".cartSection h3");
    const bool =  await page.locator("h3:has-text(\""+ProductName+"\")").isVisible();
    await  expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

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

    await page.locator("text=Place Order ").click();
   
    await console.log("now cursor here");
    page.locator(".hero-primary").waitFor();
    
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    
    const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    console.log(orderid);

    const editOrderId = orderid.split(" ");
    const ReqOrderId = editOrderId[2].trim();
    
   

    await page.locator("[routerlink*='myorders']").first().click();

    // check orderid inside the orders table
    await page.locator("tbody").waitFor();

    const rows =  await page.locator("tbody tr");
    const rowsCount = await rows.count();
    const message =   await page.locator(".table-responsive .ng-star-inserted").last().textContent();
    for(let i=0;i<rowsCount;++i)
    {
       
        const rowsearch = await rows.nth(i).locator("th");
        const a=await rowsearch.textContent();
       
        if(a==ReqOrderId)
        {
            await console.log(ReqOrderId);
            await expect(rowsearch).toHaveText(ReqOrderId);
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
   
      await console.log(message);

    
      const out = await page.locator(".tagline").textContent();
     
     const finalOrderid =  await page.locator(".col-text").textContent();
      await expect(finalOrderid.includes(ReqOrderId)).toBeTruthy();
      await console.log(out);
    // await page.pause();
    //input[type="text"]

})