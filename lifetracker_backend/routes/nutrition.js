

const express = require('express')
const Nutrition = require('../models/nutrition')
const router = express.Router()
const { requireAuthenticatedUser } = require('../middleware/security')

router.get('/',requireAuthenticatedUser, async (req,res,next) => {
  try{
    const { user } = res.locals
    const nutritions = await Nutrition.getNutritionsForUser(user)
    return res.status(200).json({
      nutritions 
    })
  }catch(err){
    next(err)
  }
})
router.post('/create', requireAuthenticatedUser, async (req,res,next) => {
  try{
    const { user } = res.locals
    const newNut = req.body.nutrition
    const nutrition = await Nutrition.addNutritionForUser(user, newNut)
    return res.status(200).json({
      nutrition
    })
  }catch(err){
    next(err)
  }
})

module.exports = router