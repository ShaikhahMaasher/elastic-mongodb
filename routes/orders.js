const express = require("express")
const router = express.Router()
const Order = require("../models/Order")
const ObjectId = require("mongoose").Types.ObjectId

const ProductModel = require("../models/Product")
const UserModel = require("../models/User")

router.get("/", (req, res) => {
  Order.find()
    .populate("products users")
    .exec(function(err, orders) {
      if (err) throw err
      res.json(orders)
    })
})

router.post("/", async (req, res) => {
  console.log(req.body.order)
  console.log(req.body.products)
  console.log(req.body.users)

  ProductModel.findById(req.body.products, function(err, product) {
    if (err) throw err
    if (product != null) {
      UserModel.findById(req.body.users, function(err, user) {
        if (err) throw err
        if (user != null) {
          var order = new Order({
            description: req.body.description,
            products: new ObjectId(req.body.products),
            users: new ObjectId(req.body.users)
          })
          console.log(order)
          order.save(function(err, result) {
            if (err) throw err
            console.log("order saved")
            res.json({ message: "order saved!", result })
            order.on("es-indexed", function(err) {
              if (err) throw err
              console.log("order indexed")
            })
          })
        } else {
          res.send("user not found")
        }
      })
    } else {
      res.send("product not found")
    }
  })
})

// Get specific Order
router.get("/:orderID", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderID)
    res.json(order)
  } catch (err) {
    res.json({ message: err })
  }
})

// Delete a Order
router.delete("/:orderID", async (req, res) => {
  try {
    const removedOrder = await Order.remove({ _id: req.params.OrderID })
    res.json(removedOrder)
  } catch (err) {
    res.json({ message: err })
  }
})

// Update a Order
router.patch("/:orderID", async (req, res) => {
  try {
    const updatedOrder = await Order.updateOne(
      { _id: req.params.OrderID },
      { $set: { name: req.body.name } }
    )
    res.json(updatedOrder)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
