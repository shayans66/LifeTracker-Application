const db = require('../db')

class Exercise {
  static async getExercisesForUser(user){
    const { email } = user
    
    let exercises = await db.query(`
      SELECT * FROM exercise 
      WHERE user_id = (SELECT id FROM users WHERE email = $1)
    `, [email])

    return exercises.rows // [{},{},...]
  }
  // {name,category,duration, intensity}
  static async addExerciseForUser(user, exercise){
    const { email } = user
    const {name, category, duration, intensity} = exercise

    
    let ex = await db.query(`
      INSERT INTO exercise(name,category,duration,intensity,user_id)
      VALUES($1, $2, $3, $4, (SELECT id FROM users WHERE email = $5) )
      RETURNING name,category,duration,intensity, user_id
    `, [name, category, duration, intensity, email])

    return ex.rows // [{},{},...]
  }

}

module.exports = Exercise