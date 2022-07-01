const Nutrition = require("../models/nutrition");
const { ForbiddenError } = require("../utils/errors");
const User = require("../models/user");

const authedUserOwnsNutrition = async (req, res, next) => {
    try {
        const {email} = res.locals.user;
        const {nutritionId} = req.params;
        const user = await User.fetchUserByEmail(email);
        const publicUser = await User.makePublicUser(user);
        const nutrition = await Nutrition.fetchNutritionById({user:publicUser, nutritionId});

        if (nutrition.user_email !== user.email) {
            throw new ForbiddenError("User is not allowed to access other user's nutrition information");
        }

        console.log("here");

        res.locals.post = nutrition;

        console.log("locals", res.locals);

        return next();

    }catch(err) {
        return next(err);
    }
}

module.exports = {
    authedUserOwnsNutrition
}