const array=[]
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken")
const secret_key='harkirpa'

const register=(req,res)=>{
    const data=req.body;
    const details=array.find((item)=>{
        if(item.email===data.email){
            return item;
        }
    });
    if(details){
        return res.send({msg:'user already registered with this account'})
    }
    const hashpassword=bcrypt.hashSync(data.password,10)
    // console.log(hashpassword)
    const tempobject={
        email:data.email,
        password:hashpassword
    }
    array.push(tempobject)
     const token=jwt.sign({useremail:data.email},secret_key)
    console.log(token)
    // res.send(array)
    res.send({msg:'userRequired',token:token})
};

const login=(req,res)=>{
    const logindata=req.body;
    const details=array.find((item)=>{
        if(item.email===logindata.email){
            return item;
        }
    });
    // console.log(details)
    if(details){
        const validate=bcrypt.compareSync(logindata.password,details.password)
        if (validate) {
            const token = jwt.sign({ useremail: logindata.email }, secret_key,{expiresIn:"360000"}); // for generating the jwt token
            console.log(token);
            return res.send({ msg: 'user login successfully', token: token });
        } else {
            return res.send('user password is wrong');
        }
    }else{
        console.log('email is wrong')
        return res.send({Msg:'email is wrong'})
    }
    // console.log('login details',logindata)
};
module.exports={register,login};