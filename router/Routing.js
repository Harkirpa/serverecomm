const routing = require("express").Router();
const dummy = require("../dummydata");
const { insertdata, getapidata } = require("../controller/usercontroller");
const {
  register,
  login,
  dashboard,
  searchproduct,
} = require("../controller/controller");
const userauth=require("../middleware/auth")
routing.get("/insert", insertdata);
routing.get("/getdata", getapidata);
routing.post("/register", register);
routing.post("/login", login);
routing.post("/search", searchproduct);
routing.get("/dashboard", userauth, dashboard);
routing.get("/data", (req, res) => {
  res.send(dummy);
});

module.exports = routing;