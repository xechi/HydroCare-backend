const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(400).json({ isValid: false, message: "Token not provided" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ isValid: false, message: "Invalid or expired token" });
        req.user = decoded;
        next();
    });
};

module.exports = isAuthenticated;