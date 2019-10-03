const router = require("express").Router()
const User = require("../models/User")
const Order = require("../models/Order")

// Search for name: Shaikhah
router.get("/user", (req, res) => {
  // "query": {
  //     "match": {
  //       "name": "Afnan"
  //     }
  //   }
  User.search(
    {
      query_string: {
        query: req.query.q
      }
    },
    function(err, results) {
      if (err) console.error(err)
      else console.log(results)
      console.log("Query String = ", req.query.q)
      console.log(typeof req.query.q)
      res.json(results)
    }
  )
})

router.get("/order", (req, res) => {
  Order.search(
    {
      query_string: {
        query: req.query.q
      }
    },
    function(err, results) {
      if (err) console.error(err)
      else console.log(results)
      console.log("Query String = ", req.query.q)
      console.log(typeof req.query.q)
      res.json(results)
    }
  )
})
module.exports = router
