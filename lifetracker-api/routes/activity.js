const express = require("express");
const Activity = require("../models/Activity");
const User = require("../models/user")
const security = require("../middleware/security");
const router = express.Router();

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const {email} = res.locals.user;
        const user = await User.fetchUserByEmail(email);
        const totalCaloriesPerDay = await Activity.calculateDailyCaloriesSummaryStats({user});
        const avgCaloriesPerCategory = await Activity.calculatePerCategoryCaloriesSummaryStats({user});
        return res.status(200).json({nutrition: {calories: {perDay: totalCaloriesPerDay, perCategory: avgCaloriesPerCategory}}})
    } catch (error) {
        next(error);
    }
})

module.exports = router;