const Store = require('../models/exercise')

const express = require('express')
const Sleep = require('../models/sleep')
const router = express.Router()
const { requireAuthenticatedUser } = require('../middleware/security')

router.get('/',requireAuthenticatedUser, async (req,res,next) => {
  try{
    const { user } = res.locals
    const sleeps = await Sleep.getSleepsForUser(user)
    return res.status(200).json({
      sleeps 
    })
  }catch(err){
    next(err)
  }
})
router.post('/create',requireAuthenticatedUser, async (req,res,next) => {
  try{
    const { user } = res.locals
    const newSleepBody = req.body.sleep
    const newSleep = await Sleep.addSleepForUser(user, newSleepBody)
    return res.status(200).json({
      sleep: newSleep
    })
  }catch(err){
    next(err)
  }
})

module.exports = router