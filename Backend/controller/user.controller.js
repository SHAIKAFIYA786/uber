const userModel=require('../models/user.model');
const userService=require('../services/user.services');
const {validationResult}=require('express-validator');
const authMiddleware=require('../middlewares/auth.middleware');

module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;
         

        const { firstname, lastname } = fullname;
        console.log("Received Data:", firstname, lastname, email, password);

        // ✅ Use `await` here
        const hashedpassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password: hashedpassword // ✅ Corrected
        });

        const token = user.generateAuthToken();
        res.status(201).json({ token, user });

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
module.exports.loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = user.generateAuthToken();
        res.cookie('token',token);
        res.status(200).json({ token, user });

    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}
module.exports.getProfile = async (req, res,next) => {
    return res.status(200).json({ user: req.user });
}