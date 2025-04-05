
class APIutils
{

    constructor(apiContext, apiBodylogin)
    {
        this.apiContext = apiContext;
        this.apiBodylogin = apiBodylogin;
    }

   async gettoken()
    {
        
        const apiResponse =  await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data : this.apiBodylogin});
        const apiResponseBody = await apiResponse.json();
       const token = apiResponseBody.token;
        return token;

    }

    async getOrderID(ordercreatePayLoad)
    {

         let  response = {};
         response.token=await this.gettoken();
        const OrderCreateAPI = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {data: ordercreatePayLoad,
            
                headers:{
                    "Authorization":response.token,
                    "content-type": "application/json"
            
                },
            });
            
            const OrderDetails = await OrderCreateAPI.json();
           const  orderId = await OrderDetails.orders[0];
            response.orderId = orderId;
            
            return response;
    }



}
module.exports={APIutils};