const express = require("express");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
const router = express.Router();

// Create a new nutrition entry
router.post("/", async (req, res, next) => {
    try {

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