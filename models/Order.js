const mongoose = require("mongoose"),
  mongoosastic = require("mongoosastic"),
  Schema = mongoose.Schema

var ProductSchema = require("./Product")
var UserSchema = require("./User")

var Discount = new Schema({
  code: String,
  percent: Number
})

var OrderSchema = new Schema(
  {
    products: {
      type: Schema.Types.ObjectId,
      ref: "product",
      es_schema: ProductSchema,
      es_indexed: true,
      es_select: "description brand type"
    },
    users: {
      type: Schema.Types.ObjectId,
      ref: "user",
      es_schema: UserSchema,
      es_indexed: true,
      es_select: "name email"
    },
    created_at: { type: Date, default: Date.now, es_indexed: true },
    description: { type: String, es_indexed: true }
  },
  { strict: false }
)

OrderSchema.plugin(mongoosastic, {
  host: process.env.ELASTICSEARCH_URL,
  port: 9200,
  populate: [
    { path: "products", select: "description brand type" },
    { path: "users", select: "name email" }
  ]
})

module.exports = mongoose.model("order", OrderSchema)
