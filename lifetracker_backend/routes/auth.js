const express = require("express")
const User = require("../models/user")
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
router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register(req.body)

    const token = createUserJwt(user) // make token
    
    return res.status(200).json({ user, token })
  } catch (err) {
    next(err)
  }
})

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  console.log('sjfsldkfjdlk');
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    // const orders = await listOrdersForUser(user);



    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});


module.exports = router
