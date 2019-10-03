const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser")
const app = express()
const usersRoute = require("./routes/users")
const productRoute = require("./routes/products")
const orderRoute = require("./routes/orders")
const searchRoute = require("./routes/search")
const cors = require("cors")
require("dotenv/config")

app.use(cors())
app.use(bodyParser.json())

app.use("/user", usersRoute)
app.use("/product", productRoute)
app.use("/order", orderRoute)
app.use("/search", searchRoute)

app.get("/", (req, res) => {
  res.send("Hi there")
})

const connection = process.env.DB_CONNECTION
mongoose.connect(connection, {
  useNewUrlParser: true
})

// test the connection
mongoose.connection
  .once("open", function() {
    console.log(`Connection made successfully to Mongo Atlas`)
  })
  .on("error", function(error) {
    console.error("Connection Error: ", error)
  })

app.listen(5500)
