const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

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
                            name,
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

    static async listNutritionForUser({user}) {
        if (!user) {
            throw new BadRequestError("No user provided");
        }

        console.log("user id", user.id);

        const results = await db.query(
            `
                SELECT  n.id,
                        n.name,
                        n.category,
                        n.calories,
                        n.image_url,
                        n.quantity,
                        n.user_id,
                        u.email as "user_email",
                        n.created_at
                FROM nutrition AS n
                    JOIN users AS u ON u.id = n.user_id
                WHERE n.user_id = $1
                ORDER BY n.created_at DESC
            `, [user.id]
        )

        return results.rows;
    }

    static async fetchNutritionById({user, nutritionId}) {
        if (!user) {
            throw new BadRequestError("No user provided");
        }
        console.log("user", user);
        console.log("user id", user.id);

        const results = await db.query(
            `
                SELECT  n.id,
                        n.name,
                        n.category,
                        n.calories,
                        n.image_url,
                        n.quantity,
                        n.user_id,
                        u.email as "user_email",
                        n.created_at
                FROM nutrition AS n
                    JOIN users AS u ON u.id = n.user_id
                WHERE n.id=$1
            `, [nutritionId]
        )

        const nutrition = results.rows[0];

        if (!nutrition) {
            throw new NotFoundError()
        }

        return nutrition;
    }
}

module.exports = Nutrition;              