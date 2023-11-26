const mongoose = require("mongoose");
const userdataSchema = mongoose.Schema({
  name: {
    type: String,
    // required: true,
    maxlength: [20, "Name is too long"],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password should be at least 8 characters"],
  }
 
});
const user = mongoose.model("Userdata", userdataSchema);
module.exports=user