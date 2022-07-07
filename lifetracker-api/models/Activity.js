const db = require("../db");

class Activity {
    // calculates **at least** the total calories consumed per day (aliased as `totalCaloriesPerDay`), along with the day (aliased as `date`)
    static async calculateDailyCaloriesSummaryStats({user}) {
        if (!user) {
            throw new BadRequestError("No user provided");
        }       

        console.log("user", user)

        const results = await db.query(
            `
                SELECT  to_char(n.created_at, 'mm/dd/yyyy') AS "date", 
                        ROUND(SUM(n.calories),0) AS "totalCaloriesPerDay"
                FROM nutrition AS n
                    JOIN users AS u ON u.id = n.user_id
                WHERE n.user_id = $1
                GROUP BY date
            `, [user.id]
        )

        return results.rows;
    }

    // calculates **at least** the average calories consumed per category (aliased as `avgCaloriesPerCategory` and **rounded down to one decimal place**), along with the category (aliased as `category`)
    static async calculatePerCategoryCaloriesSummaryStats({user}) {
        if (!user) {
            throw new BadRequestError("No user provided");
        }

        const results = await db.query(
            `
                SELECT  n.category AS "category",
                        ROUND(AVG(n.calories),1) AS "avgCaloriesPerCategory"
                        
                FROM nutrition AS n
                    JOIN users AS u ON u.id = n.user_id
                WHERE n.user_id = $1
                GROUP BY category
            `, [user.id]
        )

        return results.rows;
    }

}

module.exports = Activity;