const jwt=require("jsonwebtoken")
const secret_key='harkirpa'

const auth=(req,res,next)=>{
          const Bearertoken=req.headers["authorization"]
          console.log(Bearertoken)
    if(Bearertoken){
        const token=Bearertoken.split(" ")[1]
        const validate=jwt.verify(token,secret_key);
        if(validate){
            next();
        }
        return res.send({msg:"user not authorized"})
    }
    return res.send({msg:"user not allowed"})
}
module.exports=auth;