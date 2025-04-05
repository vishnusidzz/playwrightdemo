import{test, expect, request} from "@playwright/test";
const{APIutils} = require("./APIutils");

const apiBodylogin = { userEmail: 'vsai777333@gmail.com', userPassword: 'Password@7' };
const ordercreatePayLoad = {orders:[{country:"India",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};
let response;
let token;
test.beforeAll(async ()=>
{

 const apiContext = await request.newContext();

const apiUtils = new APIutils(apiContext,apiBodylogin);
response = await apiUtils.getOrderID(ordercreatePayLoad);
})
 
test("actualpage", async ({page})=>{

   page.addInitScript(value=>{
    window.localStorage.setItem('token', value); 
   }, response.token);

   await page.goto("https://rahulshettyacademy.com/client/");

    await page.getByRole("button", ({name: "  ORDERS"})).click();

    // check orderid inside the orders table
    console.log("vis "+ response.orderId);
    
    await page.locator(".table tbody tr th").first().waitFor();
    const count =await page.locator(".table .ng-star-inserted").count();
//await page.pause();

 console.log(count);

   const webpageOrderId = await page.locator(".table .ng-star-inserted th").filter({hasText:response.orderId}).textContent();
    console.log(webpageOrderId);
    expect(webpageOrderId).toMatch(response.orderId);


})



