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

    
    let exercise = await db.query(`
      INSERT INTO exercise(name,category,duration,intensity)
      VALUES($1, $2, $3, $4)
      RETURNING name,category,duration,intensity
    `, [name, category, duration, intensity])

    return exercise.rows // [{},{},...]
  }

}

module.exports = Exercise