class DashBoardPage
{
 constructor(page, expect)
{
        this.page = page;
        this.expect = expect;
        this.items =  page.locator(".card-body");
        this.productAddedMsg = page.locator(".toast-message");
        this.gotoCart = page.locator("[routerlink*='cart']");
        this.CreditCard = page.locator("input[value='4542 9931 9292 2293']");
        this.ExpiryMonthCC = page.locator("select[class='input ddl']");
        this.ExpiryDayCC = page.locator("select[class='input ddl']");
        this.creditCardField = page.locator("input[type='text']");
        this.Country = page.locator("input[placeholder*='Country']");
        this.Country_DropDown = page.locator(".ta-results");
        this.PlaceOrderButton = page.locator("text=Place Order ");
        this.orderIdPlaceOrder = page.locator(".em-spacer-1 .ng-star-inserted");
        this.ClickOnmyOrder= page.locator("[routerlink*='myorders']");
      
        
       

}

async addProductToCart(ProductName)
{
    
    const AllProducts = await  this.page.locator(".card-body");
    const productCount =await  this.items.count();

    for(let i=0;i<=productCount;++i)
        { 
           if(await this.items.nth(i).locator("b").textContent() === ProductName)
           {
           
                await this.items.nth(i).locator("text= Add To Cart").click();
                
                break;
           }
        }
     
}

async navigateToCart()
{
    await this.gotoCart.click();
    await this.page.locator("div li").first().waitFor();
}

async checkOut(ProductName)
{
    await this.page.locator(".cartSection h3");
    const bool =  await this.page.locator("h3:has-text(\""+ProductName+"\")").isVisible();
    await this.expect(bool).toBeTruthy();
    await this.page.locator("text=Checkout").click();
}

async myCart(ProductName, CreditCardNo, MonthCC, DayCC, CVV, ccHolderName, Country)
{

        await this.CreditCard.clear();
        await this.CreditCard.fill(CreditCardNo);
    
        await this.ExpiryMonthCC.first().selectOption(MonthCC);
        await this.ExpiryDayCC.nth(1).selectOption(DayCC);
       
    
        await this.creditCardField.first().fill(CVV);
        await this.creditCardField.nth(2).fill(ccHolderName);
       
        await this.Country.pressSequentially(Country);
    
    
        const no_DropDowns = this.Country_DropDown;
        await this.Country_DropDown.waitFor();
        const count  = await no_DropDowns.locator("button").count();
        
        for(let i=0;i<count;++i)
        
        {
            const text = await no_DropDowns.locator("button").nth(i).textContent();
            if( text ===" "+Country)
            {
               await no_DropDowns.locator("button").nth(i).click();
    
               this.page.screenshot();
               break;
            }
        }
    
        //verify email is correct
    
        
       // await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    
}

async clickOnPlaceOrder()
{
    await this.PlaceOrderButton.click();
       
        await console.log("now cursor here");
        this.page.locator(".hero-primary").waitFor();
        
}

async thankYouPage()
{
    await this.expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); 
        
}

async myOrder()
{
    const orderid = await this.orderIdPlaceOrder.textContent();
    
        console.log(orderid);
    
        const editOrderId = orderid.split(" ");
        const ReqOrderId = editOrderId[2].trim();
       
    await this.ClickOnmyOrder.first().click();
    
        // check orderid inside the orders table
        await this.page.locator("tbody").waitFor();
    
        const rows =  await this.page.locator("tbody tr");
        const rowsCount = await rows.count();
        const message =   await this.page.locator(".table-responsive .ng-star-inserted").last().textContent();
        for(let i=0;i<rowsCount;++i)
        {
           
            const rowsearch = await rows.nth(i).locator("th");
            const a=await rowsearch.textContent();
           
            if(a==ReqOrderId)
            {
                await console.log(ReqOrderId);
                await this.expect(rowsearch).toHaveText(ReqOrderId);
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
       
          await console.log(message);
    
        
          const out = await this.page.locator(".tagline").textContent();
         
         const finalOrderid =  await this.page.locator(".col-text").textContent();
          await this.expect(finalOrderid.includes(ReqOrderId)).toBeTruthy();
          await console.log(out);
}

}
module.exports = {DashBoardPage};