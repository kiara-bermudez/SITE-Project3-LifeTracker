const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Nutrition {
    static async createNutrition({nutrition, user}) {
        // User should submit fields: `"name"`, `"category"`, `"calories"`, and `"image_url"`
        const requiredFields = ["name", "category", "calories", "image_url", "quantity"];
        // Error if missing required field
        requiredFields.forEach((field) => {
            if (!nutrition.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field ${field} missing from request body `);
            }
        })

        // Insert nutrition entry into database
        const results = await db.query(
            `
                INSERT INTO nutrition (name, category, calories, image_url, quantity, user_id)
                VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email=$6))
                RETURNING   id,
                            category,
                            calories,
                            image_url,
                            quantity,
                            user_id,
                            created_at
            `, [nutrition.name, nutrition.category, nutrition.calories, nutrition.image_url, nutrition.quantity, user.email]
        )
        
        return results.rows[0];  
    }
}

module.exports = Nutrition;