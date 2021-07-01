const db = require('../db')

class Nutrition {
  static async getNutritionsForUser(user){
    const { email } = user
    
    let nutrition = await db.query(`
      SELECT * FROM nutrition 
      WHERE user_id = (SELECT id FROM users WHERE email = $1)

    `, [email])

    return nutrition.rows // [{},{},...]
  }
  static async addNutritionForUser(user, exercise){
    const { email } = user
    const {name, category, quantity, calories, imgurl} = exercise

    
    let nutrition = await db.query(`
      INSERT INTO nutrition(name, category, quantity, calories, imgurl, user_id)
      VALUES($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email = $6) )
      RETURNING *
    `, [name, category, quantity, calories, imgurl, email])

    return nutrition.rows // [{},{},...]
  }

}

module.exports = Nutrition

