const db = require('../db')

class Sleep {
  static async getSleepsForUser(user){
    const { email } = user
    
    let sleeps = await db.query(`
      SELECT * FROM sleep 
      WHERE user_id = (SELECT id FROM users WHERE email = $1)
    `, [email])

    return sleeps.rows // [{},{},...]
  }
  static async addSleepForUser(user, exercise){
    const { email } = user
    const {start_time, end_time} = exercise

    
    let sleep = await db.query(`
      INSERT INTO sleep(start_time, end_time, user_id)
      VALUES($1, $2 (SELECT id FROM users WHERE email = $3) )
      RETURNING start_time, end_time, user_id
    `, [start_time, end_time, email])

    return sleep.rows // [{},{},...]
  }

}

module.exports = Sleep

