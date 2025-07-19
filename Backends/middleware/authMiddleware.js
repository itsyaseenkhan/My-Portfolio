// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const protect = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) return res.status(401).json({ message: "No token" });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.Admin = decoded.id;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Token invalid" });
  }
};

module.exports = verifyToken;
