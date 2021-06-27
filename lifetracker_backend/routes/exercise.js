const Order = require('../models/activity.js')

const express = require('express')
const router = express.Router()
const { requireAuthenticatedUser } = require('../middleware/security')
const { BadRequestError } = require('../utils/errors.js')

router.get('/', requireAuthenticatedUser, async (req,res,next) => {
  console.log('geteorder');
  try{
    const { user } = res.locals
    const products = await Order.listOrdersForUser(user)
    return res.status(200).json({
      orders : products
    })
  }catch(err){
    next(err)
  }

})


module.exports = router