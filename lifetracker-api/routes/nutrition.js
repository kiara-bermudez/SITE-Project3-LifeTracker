const express = require("express");
const { createUserJwt } = require("../utils/tokens");
const User = require("../models/user");
const security = require("../middleware/security");
const router = express.Router();
const Nutrition = require("../models/nutrition");
const permissions = require("../middleware/permissions");

// Create a new nutrition entry
router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const {user} = res.locals;
        const nutrition = await Nutrition.createNutrition({ user, nutrition: req.body});
        return res.status(201).json({nutrition});
    }catch(err) {
        next(err);
    }
})

// Get all user owned nutrition entries
router.get("/", security.requireAuthenticatedUser, async (req,res,next) => {
    try {
        const {email} = res.locals.user;
        const user = await User.fetchUserByEmail(email);
        const publicUser = await User.makePublicUser(user);
        const allEntries = await Nutrition.listNutritionForUser({user:publicUser});
        return res.status(200).json({nutritions: allEntries});
    } catch(err) {
        next(err);
    }
})

// Get nutrition based on nutrition id
router.get("/:nutritionId", security.requireAuthenticatedUser, permissions.authedUserOwnsNutrition, async (req, res, next) => {
    try {
        const {email} = res.locals.user;
        const {nutritionId} = req.params;
        console.log("locals", res.locals);
        const user = await User.fetchUserByEmail(email);
        const publicUser = await User.makePublicUser(user);
        console.log("public user", publicUser);
        const nutritionEntry = await Nutrition.fetchNutritionById({user:publicUser, nutritionId});
        return res.status(200).json({nutrition: nutritionEntry});
    }catch(err) {
        next(err);
    }
})



module.exports = router;