const dummy = require("../dummydata");
const Product = require("../moongoose/User");

const insertdata = async (req, res) => {
  try {
    const user = await Product.create(dummy);
    res.status(201).send({
      msg: "successfully inserted data",
      success: true,
      User: user,
    });
  } catch (error) {
    console.log("Error while inserting data", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getapidata = async (req, res) => {
  try {
    const result = await Product.find({});
    res.status(200).send(result);
  } catch (err) {
    console.log("Error to Find User " + err);
  }
};

module.exports = { insertdata, getapidata };
