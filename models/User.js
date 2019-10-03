const mongoose = require("mongoose"),
  mongoosastic = require("mongoosastic"),
  Schema = mongoose.Schema

var UserSchema = new Schema({
  name: { type: String, es_indexed: true, required: true },
  email: { type: String, es_indexed: true },
  country: { type: String, es_indexed: true },
  city: String
})

UserSchema.plugin(mongoosastic, {
  host: process.env.ELASTICSEARCH_URL
})
module.exports = mongoose.model("user", UserSchema)
