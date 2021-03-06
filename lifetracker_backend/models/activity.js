const db = require('../db')

class Activity {
  static async getTotalExerciseForUser(user){
    const email = user.email
    
    // bad
    const quer = await db.query(`
      SELECT SUM(duration) FROM exercise
        WHERE user_id = (SELECT id FROM users WHERE email = $1)
    `, [email])

    // console.log('quer',quer);
    return quer.rows[0].sum
  }
  static async getAverageIntensityForUser(user){
    const email = user.email
    
    // bad
    const quer = await db.query(`
      SELECT AVG(intensity) FROM exercise
        WHERE user_id = (SELECT id FROM users WHERE email = $1)
    `, [email])

    return quer.rows[0].avg
  }



}

module.exports = Activity