const express=require("express");
const categoryRouter=require('./categoryrouter')
// const auth=require('./middleware/auth')
const app=express();
app.use(express.json());
const cors = require('cors');
// const connection=require("./config/db")
app.use(cors({
    origin: '*'
}));
app.use('/api',categoryRouter)
app.get('/',(req,res)=>{
    res.send('API is running fine')
});
app.listen(4000,async()=>{
    try{
        // await connection()
        console.log('server is running on Port No. 4001')
    }
    catch(err){
           console.log('error occured during starting the live error',err)
    }
  
})