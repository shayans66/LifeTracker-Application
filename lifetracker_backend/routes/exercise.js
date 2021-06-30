const Order = require('../models/activity.js')

const express = require('express')
const router = express.Router()
const { requireAuthenticatedUser } = require('../middleware/security')
const { BadRequestError } = require('../utils/errors.js')
const Exercise = require('../models/exercise.js')

router.get('/', requireAuthenticatedUser, async (req,res,next) => {

  try{
    const { user } = res.locals
    const products = await Exercise.getExercisesForUser(user)
    return res.status(200).json({
      orders : products
    })
  }catch(err){
    next(err)
  }

})
router.post('/create', requireAuthenticatedUser, async (req,res,next) => {

  try{
    const { user } = res.locals
    const exDetails = req.body.exercise
    const products = await Exercise.addExerciseForUser(user, exDetails)
    return res.status(200).json({
      orders : products
    })
  }catch(err){
    next(err)
  }

})


module.exports = router