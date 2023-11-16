const express=require("express");
const categoryRouter=require('./categoryrouter')
// const auth=require('./middleware/auth')
const PORT=4001
const app=express();
const cors = require('cors');
// const connection=require("../server/mongoose/moongoose")
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use('/api',categoryRouter)
app.get('/',(req,res)=>{
    res.send('API is running fine')
});
app.listen(PORT,async()=>{
    try{
        // await connection()
        console.log('server is running on Port No. 4001')
    }
    catch(err){
           console.log('error occured during starting the live error',err)
    }
  
})