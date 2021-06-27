const express = require("express")
const User = require("../models/nutrition")
const Order = require('../models/activity')
const router = express.Router()

const {createUserJwt} = require('../utils/tokens') // create jwt
const security = require('../middleware/security') // middleware
const { createOrder } = require("../models/activity")

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body)

    const token = createUserJwt(user) // make token
    
    return res.status(200).json({ user, token })
  } catch (err) {
    next(err)
  }
})


module.exports = router
