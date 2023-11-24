const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../moongoose/User");
const User = require("../moongoose/UserModel");
const secretkey = "harkirpa";
const saltnumber = 10;

const register = async (req,res)=>{
  try{      
      const {email, password,name} = req.body;
      console.log(req.body)

      const existingUser = await User.findOne({email}).maxTimeMS(20000)

      if(existingUser){
          return res.status(400).json({message:"User already exist"})
      }

      const hashedPassword = await bcrypt.hash(password,10)

      const newUser  =  new User({email,password:hashedPassword})
      await newUser.save()

      const token = jwt.sign({userId:newUser._id},"secret",{expiresIn:"2d"})
      return res.status(201).json({ message: 'User created successfully',token, email,name});
    
  }catch(error){
      console.log(error);
      return res.status(500).json({message:"Internal Server Error"})
  }
}

const login = async (req, res) => {
  try {
    let data = req.body;
    const { email, password } = data;

    const nuser = await User.findOne({ email: email });

    if (!nuser) {
      return res.status(200).send({ success: false, msg: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, User.password);

    if (!isPasswordValid) {
      return res.status(200).send({ success: false, msg: "Incorrect password" });
    }

    const token = jwt.sign({ _id: User._id }, secretkey, { expiresIn: "24h" });

    res.status(200).send({
      success: true,
      data: {
        user: { email: User.email }, // Avoid logging the password
        token: token,
        userid: User._id
      }
    });
  } catch (e) {
    console.error("Error during login:", e);
    res.status(500).send({ success: false, error: "An error occurred", message: e.message });
  }
};
const dashboard = (req, res) => {
    return res.send({
      result: "Verify",
    });
  };
const searchproduct = async (req, res) => {
  try {
    const search = req.body.search;
    console.log(req.body.search);
    const searching = await Product.find({
      Name: { $regex: new RegExp(search, "i") }, // "i" for case-insensitive search
    });
    console.log(search);
    if (searching.length > 0) {
      return res
        .status(200)
        .json({ success: true, msg: "Product details", data: searching });
    } else {
      return res.status(404).json({ msg: "No matching products found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { register, login,dashboard, searchproduct };
