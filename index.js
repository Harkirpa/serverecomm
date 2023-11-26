require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const routing=require("./router/Routing")
const categoryRouter=require('./categoryrouter');
const connectdb = require("./config/db");
const port = 4000;
const stripe = require("stripe")("sk_test_51OFWLzSIxNWsH91sWLyg64W7geTkp8idVZwHDIBS7IyLPEBu9daqeRJ5PYbQXb0sVoePLP7hgokCpj0OadxbF5Dc003Ii7i9fd");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use('/api',categoryRouter)
app.use(routing);
connectdb()
// checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;
    // console.log(products)
    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name,
            },
            unit_amount:product.MRP * 100,
        },
        quantity:product.quantity
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"https://serverecommerce-5g49.onrender.com",
        cancel_url:"https://serverecommerce-5g49.onrender.com/cart",
    });

    res.json({id:session.id})
 
})

app.listen(port,async()=>{
    try{
        // await connection();
        console.log('server is running on Port No. 4000')
    }
    catch(err){
           console.log('error occured during starting the live error',err)
    }
  
})