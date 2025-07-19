const jwt = require("jsonwebtoken");
require("dotenv").config();

const protect = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.Admin = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });ioeroiehr
    }
};

