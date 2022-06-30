const db = require("../db");
const bcrypt = require("bcrypt");
const {BCRYPT_WORK_FACTOR} = require("../config");
const {UnauthorizedError, BadRequestError} = require("../utils/errors");

class User {
    static async makePublicUser(user) {
        return {
            id:user.id,
            username:user.username,
            email:user.email,
            first_name:user.first_name,
            last_name:user.last_name,
            created_at:user.created_at,
            updated_at:user.updated_at
        }
    }

    static async login(credentials) {
        // User should submit email and password
        const requiredFields = ["email", "password"];
        // Error: if any fields are missing
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        })

        // Look up user in database by email
        const user = await User.fetchUserByEmail(credentials.email);
        // If user found, compare submitted password with password in database
        if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (isValid) {
                return User.makePublicUser(user);
            }
        }
        
        // If match, return user
        // Error: if anything goes wrong
        throw new UnauthorizedError("Invalid email/password combo")
    }

    static async register(credentials) {
        console.log("Registering User");
        // User should submit email, password
        const requiredFields = ["email", "password", "username", "first_name", "last_name"];
        // Error: if any fields are missing
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        })

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email");
        }
        
        // Error: if user with same email already exists
        const existingUser = await User.fetchUserByEmail(credentials.email);
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`);
        }

        // Error: if user with same username exists
        const existingUsername = await User.checkExistingUsername(credentials.username);
        if (existingUsername) {
            throw new BadRequestError(`Username already exists`)
        }
        

        // Take user password and hash it
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)


        // Take user email and lowercase it
        const lowerCasedEmail = credentials.email.toLowerCase();
        const lowerCasedUsername = credentials.username.toLowerCase();

        const result = await db.query(`
            INSERT INTO users (
                email,
                username,
                first_name,
                last_name,
                password
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, username, first_name, last_name, password, created_at, updated_at;
        `, [lowerCasedEmail, lowerCasedUsername, credentials.first_name, credentials.last_name, hashedPassword])

        // Return user
        const user = result.rows[0];

       

        return User.makePublicUser(user);
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided");
        }

        const query = `SELECT * FROM users WHERE email = $1`;

        const result = await db.query(query, [email.toLowerCase()]);

        const user = result.rows[0];

        return user;
    }

    static async checkExistingUsername(username) {
        if (!username) {
            throw new BadRequestError("No username provided");
        }

        const query = 'SELECT * FROM users WHERE username=$1';

        const result = await db.query(query, [username.toLowerCase()]);

        const user = result.rows[0];

        return user;
    }
}

module.exports = User;