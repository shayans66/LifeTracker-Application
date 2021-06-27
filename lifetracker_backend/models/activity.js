const db = require('../db')

class Activity {
  static async listActivityForUser(user){
    const email = user.email
    
    // bad
    const quer = await db.query(`
      SELECT name, category, duration, intensity FROM exercise
        WHERE user_id = (SELECT id FROM users WHERE email = $1)
    `, [email])

    return quer.rows
  }



}

module.exports = Activity