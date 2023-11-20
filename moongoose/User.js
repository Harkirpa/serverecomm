const mongoose = require("mongoose");

const apiscehma = new mongoose.Schema({
  name: String,
 subcat:String
  
});
const Product=mongoose.model('Product',apiscehma)
module.exports = Product;