const { dummy } = require("../dummydata");
const Product = require("../moongoose/User");

const insertdata = async (req, res) => {
  try {
    const response = await Product.create(dummy);
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
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

module.exports = { insertdata, getapidata }