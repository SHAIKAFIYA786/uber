// const bcrypt=require('bcrypt');
// const jwt=require('jsonwebtoken');
// const userModel=require('../models/user.model');

// module.exports.authMiddleware = async (req, res, next) => {
//     console.log("Headers Received:", req.headers); // Debugging: Log all headers

//     let token = req.cookies.token; // First, check if the token is in cookies
//     console.log("Token  from Cookies:", token);
//     const auth = req.headers.authorization;
//     console.log("headers auth:", auth); // Debugging: Check if token is extracted correctly

//     if (!token && req.headers.authorization) { // If no token in cookies, check the authorization header
//         const authHeader = req.headers.authorization;
//         const parts = authHeader.split(" "); // Split the header by space

//         if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
//             token = parts[1]; // Extract the actual token
//         }
//     }

//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }    
  

//     console.log("Extracted Token:", token); // Debugging: Check if token is extracted correctly

//     const isBlacklisted = await userModel.findOne({ token });
//     if (isBlacklisted) {
//         return res.status(401).json({ message: "message: Token is blacklisted. Please log in again." });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
//         const user = await userModel.findById(decoded._id); // Find the user by ID
//         req.user = user; // Attach the user to the request object
//         return next(); // Proceed to the next middleware
//     } catch (error) {
//         console.error("Error in authMiddleware:", error);
//         res.cookie("token", token); // Set the token in cookies
//         return res.status(500).json({ message: "Internal Server Error", error });
//     }
// };
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

module.exports.authMiddleware = async (req, res, next) => {
    console.log("Headers Received:", req.headers); // Debugging: Log all headers

    let token = req.cookies.token; // First, check if the token is in cookies
    console.log("Token from Cookies:", token);
    const auth = req.headers.authorization;
    console.log("Headers auth:", auth); // Debugging: Check if token is extracted correctly

    if (!token && req.headers.authorization) { // If no token in cookies, check the authorization header
        const authHeader = req.headers.authorization;
        const parts = authHeader.split(" "); // Split the header by space

        if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
            token = parts[1]; // Extract the actual token
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    console.log("Extracted Token:", token); // Debugging: Check if token is extracted correctly

    const isBlacklisted = await userModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Token is blacklisted. Please log in again." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        const user = await userModel.findById(decoded._id); // Find the user by ID
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user; // Attach the user to the request object
        return next(); // Proceed to the next middleware
    } catch (error) {
        console.error("Error in authMiddleware:", error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Unauthorized: Token has expired" });
        }

        res.cookie("token", token); // Set the token in cookies (if needed)
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};
