const express = require("express");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
const router = express.Router();
const Nutrition = require("../models/nutrition");

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

    } catch(err) {
        next(err);
    }
})

// Get nutrition based on nutrition id
router.get("/:nutritionId", async (req, res, next) => {
    try {

    }catch(err) {
        next(err);
    }
})



module.exports = router;