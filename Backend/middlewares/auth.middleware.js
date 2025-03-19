const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userModel=require('../models/user.model');

// module.exports.authMiddleware=async (req,res,next)=>{
//     // console.log("req.cookies");
//     console.log("req.headers.authorization:", req.headers);
//     const token=req.cookies.token || req.headers.authorization.split(' ')[1];
//     if(!token){
//         return res.status(401).json({message:"Unauthorized"});
//     }
//     try{
//         const decoded=jwt.verify(token,process.env.JWT_SECRET);
//         const user=await userModel.findById(decoded._id);
//         req.user=user;
//         return next();
//     }catch(error){
//         console.error("Error in authMiddleware:",error);
//         res.cookie("token",token);
//         return res.status(500).json({message:"Internal Server Error",error});
//     }
// }
module.exports.authMiddleware = (req, res, next) => {
    console.log("Headers Received:", req.headers); // Debugging: Log all headers

    let token = req.cookies.token; // First, check if the token is in cookies
    console.log("Token from Cookies:", token); 
    const auth=req.headers.authorization;
    console.log("headers auth:",auth)// Debugging: Check if token is extracted correctly
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
    next();
};
