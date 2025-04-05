
import {test, expect} from "@playwright/test";
const {LoginPage} = require('../PageObjects/LoginPage');
const {DashBoardPage} = require('../PageObjects/DashBoardPage');

test("Client test", async ({page})=>{


    const username = "vsai777333@gmail.com";
    const password = "Password@7";
    const url = "https://rahulshettyacademy.com/client/";
    const ProductName = "ZARA COAT 3";
    const CreditCardNo = "12312341234";
    const MonthCC = "11";
    const DayCC= "23";
    const CVV = "123";
    const ccHolderName ="Vishnu";
    const Country = "India";

   const loginPage = new LoginPage(page, expect);

  await loginPage.goToUrl(url);
  await loginPage.validLogin(username, password);
  

  const ItemDashBoard  = new DashBoardPage(page, expect);

  await ItemDashBoard.addProductToCart(ProductName);

  await ItemDashBoard.navigateToCart();

  await ItemDashBoard.checkOut(ProductName);



  await ItemDashBoard.myCart(ProductName, CreditCardNo, MonthCC, DayCC, CVV, ccHolderName, Country);

  await ItemDashBoard.clickOnPlaceOrder();

  await ItemDashBoard.thankYouPage();

  await ItemDashBoard.myOrder();

  

}

)