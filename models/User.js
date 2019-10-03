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

var User = mongoose.model("user", UserSchema),
  stream = User.synchronize(),
  count = 0

stream.on("data", function(err, doc) {
  count++
})
stream.on("close", function() {
  console.log("indexed " + count + " documents!")
})
stream.on("error", function(err) {
  console.log(err)
})

module.exports = User
