

const express = require('express')
const { default: Nutrition } = require('../../lifetracker-ui/src/components/Nutrition/Nutrition')
const router = express.Router()

router.get('/', async (req,res,next) => {
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
router.get('/create', async (req,res,next) => {
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