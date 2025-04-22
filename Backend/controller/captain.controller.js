const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const blocklistSchema = require('../models/user.blocklist.model');
const captainservices = require('../services/captain.services');
const Captain = require('../models/captain.model');
const captainController = require('../controller/captain.controller');

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

        const captain = await captainservices.createCaptain({
            fullname: { firstname, lastname },
            email,
            password: hashedPassword,  // ✅ Now we use the hashed password
            vehicle
        });

        const token =captain.generateAuthToken();
        res.cookie("token", token);
        res.status(201).json({ token, captain });

    } catch (error) {
        console.error("Error in registerCaptain:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

module.exports.loginCaptain = async (req, res) => {
    try {
        const { email, password } = req.body;

        const captain = await Captain.findOne({ email });
        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }

        const isPasswordValid = await Captain.comparePassword(password, captain.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = captain.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({ token, captain });
    } catch (error) {
        console.error("Error in loginCaptain:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
module.exports.loginCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const captain = await Captain.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }

        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = captain.generateAuthToken();
        res.cookie('token',token);
        res.status(200).json({ token, captain });

    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}