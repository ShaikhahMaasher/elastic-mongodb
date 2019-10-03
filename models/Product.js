const mongoose = require("mongoose"),
  Schema = mongoose.Schema

var ProductSchema = new Schema({
  description: String,
  brand: String,
  category: String,
  type: String
})

module.exports = mongoose.model("product", ProductSchema)
