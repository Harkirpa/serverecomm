const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../moongoose/User");
const User = require("../moongoose/UserModel");
const secretkey = "harkirpa";

const register = async (req, res) => {
  const details = req.body;
  const salt = 10;
  const regData = await User.findOne({ email: details.email });

  if (regData) {
    return res.send({ msg: "User is already registered" });
  }
  const hashPassword = bcrypt.hashSync(details.password, salt);
  const Obj = {
    name: details.name,
    email: details.email,
    password: hashPassword,
  };
  await User.create(Obj);

  const getRegsDb = await User.find({});
  console.log(getRegsDb);

  return res.send({ msg: "User is successfully Registered" });
};

const login = async (req, res) => {
  const logData = req.body;
  const logDb = await User.find({});

  const LogDetails = logDb.find((item) => {
    if (logData.email === item.email) {
      return item;
    }
  });

  if (LogDetails) {
    const encrypt = bcrypt.compareSync(logData.password, LogDetails.password);
    if (encrypt) {
      const token = jwt.sign({ email: logData.email }, secretkey, {
        expiresIn: "7d",
      });
      console.log({
        msg: "User is successfully Login",
        name: LogDetails.name,
        token: token,
      });
      return res.send({
        msg: "User is successfully Login",
        name: LogDetails.name,
        token: token,
      });
    } else {
      return res.send({ msg: "Check the Password" });
    }
  } else {
    return res.send({ msg: "Check the Email or Try to Register again" });
  }
};
const dashboard = (req, res) => {
    return res.send({
      result: "Verify",
    });
  };
  const searchproduct= async (req, res) => {
    const { category } = req.query;
  
    const queryObj = {};
    if (category) {
      queryObj.name = { $regex: category, $options: "i" };
    }
    try {
      const searchedData = await Product.find(queryObj);
      res.send(searchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal Server Error");
    }
  };
module.exports = { register, login,dashboard, searchproduct };
