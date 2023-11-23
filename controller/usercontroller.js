const dummy = require("../dummydata");
const api = require("../moongoose/User");

const insertdata = async (req, res) => {
  try {
    await api.deleteMany({});
    const user = await api.create(dummy);
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
    const result = await api.find();
    res.status(200).send(result);
  } catch (err) {
    console.log("Error to Find User " + err);
  }
};

module.exports = { insertdata, getapidata };
