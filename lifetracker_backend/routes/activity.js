const express = require("express")
const User = require("../models/nutrition")
const Order = require('../models/activity')
const router = express.Router()

const {createUserJwt} = require('../utils/tokens') // create jwt
const security = require('../middleware/security') // middleware
const { createOrder } = require("../models/activity")
const Activity = require("../models/activity")

router.get("/", async (req, res, next) => {
  try{
    const { user } = res.locals
    const totExercises = await Activity.getTotalExerciseForUser(user)
    const avgIntensity = await Activity.getAverageIntensityForUser(user)

    let analytics = {exercise: [], nutrition: [], sleep: []}
    analytics.exercise.push({
      totalExerciseMinutes: totExercises,
      maximumHourlyCalories: avgIntensity
    })


    return res.status(200).json({
      activity: analytics
    })
  }catch(err){
    next(err)
  }
})


module.exports = router
