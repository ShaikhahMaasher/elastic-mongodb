const express = require("express")
const router = express.Router()
const Product = require("../models/Product")

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
    console.log(products)
  } catch (err) {
    res.json({ message: err })
    console.log(err)
  }
})

router.post("/", async (req, res) => {
  const product = new Product(req.body)
  try {
    const savedProduct = await product.save()
    res.json(savedProduct)
  } catch (err) {
    res.json({ message: err })
  }
})

// Get specific Product
router.get("/:ProductID", async (req, res) => {
  try {
    const product = await Product.findById(req.params.ProductID)
    res.json(product)
  } catch (err) {
    res.json({ message: err })
  }
})

// Delete a Product
router.delete("/:ProductID", async (req, res) => {
  try {
    const removedProduct = await Product.remove({ _id: req.params.ProductID })
    res.json(removedProduct)
  } catch (err) {
    res.json({ message: err })
  }
})

// Update a Product
router.patch("/:ProductID", async (req, res) => {
  try {
    const updatedProduct = await Product.updateOne(
      { _id: req.params.ProductID },
      { $set: { name: req.body.name } }
    )
    res.json(updatedProduct)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
