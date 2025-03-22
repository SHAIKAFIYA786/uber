const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const blocklistSchema = require('../models/user.blocklist.model');
const captainservices = require('../services/captain.services');
const Captain = require('../models/captain.model');

module.exports.registerCaptain = async (req, res) => {
    try {
        const { fullname, email, password, vehicle } = req.body;
        const { firstname, lastname } = fullname;

        const isCaptain = await Captain.findOne({ email });
        if (isCaptain) {
            return res.status(400).json({ message: "Captain already exists" });
        }

        // ✅ Use model method to hash password
        const hashedPassword = await Captain.hashPassword(password);

        const captain = await Captain.create({
            fullname: { firstname, lastname },
            email,
            password: hashedPassword,  // ✅ Now we use the hashed password
            vehicle
        });

        const token = captain.generateAuthToken();
        res.cookie("token", token);
        res.status(201).json({ token, captain });

    } catch (error) {
        console.error("Error in registerCaptain:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

module.exports.loginCaptain = async (req, res) => {
}