const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require("./routes/auth");
const security = require("./middleware/security");

const { NotFoundError} = require("./utils/errors")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

console.log("middleware")
app.use(security.extractUserFromJwt);

app.use("/auth", authRoutes);

// Health endpoint
app.get("/",  (req, res, next) => {
    res.status(200).json({ping: "pong"})
})

app.use((req, res, next) => {
    return next(new NotFoundError());
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;
    
    return res.status(status).json({
        error: {message, status}
    })
})

module.exports = app;