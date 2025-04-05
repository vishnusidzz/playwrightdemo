class LoginPage
{

constructor(page)
{
        this.page = page;
        this.SingInButton = page.locator("#login");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        

}
async goToUrl(url)
{
    await this.page.goto(url);
}

async validLogin(userName,password)
{
    await this.username.fill(userName);
    await this.password.fill(password);
    await this.SingInButton.click();
    await this.page.locator(".card-body b").first().waitFor();
}

}
module.exports={LoginPage};