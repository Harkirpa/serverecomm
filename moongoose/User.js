const mongoose = require("mongoose");

const apiscehma = new mongoose.Schema({
  id:Number,
  name: String,
  Image:String,
  quantity:Number,
  MRP:Number,
  Rating:Number,
  Availabeoffer1:String,
  Availabeoffer2:String,
  category:String,
 subcat:String
  
});
const Product=mongoose.model('Product',apiscehma)
module.exports = Product;