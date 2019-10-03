const express = require("express")
const router = express.Router()
const User = require("../models/User")

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
    console.log(users)
  } catch (err) {
    res.json({ message: err })
    console.log(err)
  }
})

// Add a user
router.post("/", async (req, res) => {
  const user = new User(req.body)
  try {
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (err) {
    res.json({ message: err })
  }
})

// Get specific user
router.get("/:userID", async (req, res) => {
  try {
    const user = await User.findById(req.params.userID)
    res.json(user)
  } catch (err) {
    res.json({ message: err })
  }
})

// Delete a user
router.delete("/:userID", async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userID })
    res.json(removedUser)
  } catch (err) {
    res.json({ message: err })
  }
})

// Update a user
router.patch("/:userID", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userID },
      { $set: { name: req.body.name } }
    )
    res.json(updatedUser)
  } catch (err) {
    res.json({ message: err })
  }
})

// Search for name: Shaikhah
router.get("/search", (req, res) => {
  User.search(
    {
      query_string: {
        query: "Shaikhah 2"
      }
    },
    function(err, results) {
      console.log(err)
      console.log(results)
      res.json(results)
    }
  )
})

// router.get("/search", function(req, res) {
//   User.search({ query_string: { query: req.query.q } }, function(err, results) {
//     res.json(results)
//   })
// })

module.exports = router
