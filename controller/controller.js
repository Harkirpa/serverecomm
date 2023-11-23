const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../moongoose/User");
const userdata = require("../moongoose/UserModel");
const secretkey = "harkirpa";
const saltnumber = 10;

const register = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
      return res.status(200).send({ msg: "Passwords do not match" });
    }

    // Check if the email is already in use
    const existingUser = await userdata.findOne({ email });
    if (existingUser) {
      return res.status(200).send({ msg: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltnumber);
    const hashconfirmpass = await bcrypt.hash(confirmpassword, saltnumber);

    // Create the user
    const user = await userdata.create({
      username,
      email,
      password: hashedPassword,
      confirmpassword: hashconfirmpass, // Include the confirmpassword field
    });

    console.log(user);
    res.status(200).send({ user });
  } catch (error) {
    console.error(error); // Use `console.error` to log errors
    res.status(500).send({ msg: "User not created", err: error.message });
  }
};

const login = async (req, res) => {
  try {
    let data = req.body;
    const { email, password } = data;
    console.log(data);
    const login = await userdata.findOne({ email: email });
    if (!login) {
      return res.status(200).send({ msg: "user not found" });
    }
    if ((await bcrypt.compare(password, login.password)) == false) {
      return res.status(200).send({ msg: "incorrect password" });
    }
    const token = jwt.sign({ _id: login._id }, secretkey, { expiresIn: "24h" });
    console.log(login, token);
    const loginemail = login.email;
    const loginpass = login.password;
    console.log(loginemail, loginpass);

    res
      .status(200)
      .send({ user: [loginemail, loginpass], token: token, userid: login._id });
  } catch (e) {
    res.status(500).send("error occured", e);
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
