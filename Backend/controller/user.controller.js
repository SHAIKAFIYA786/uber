const userModel=require('../models/user.model');
const userService=require('../services/user.services');
const {validationResult}=require('express-validator');

// module.exports.registerUser=async (req,res)=>{
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//             return res.status(400).json({ errors: errors.array() });
//     }
//     const { fullname: { firstname, lastname }, email, password } = req.body;
//     console.log(req.body)
//     const hasedpassword=userModel.hashPassword(password);
//     const user=await userService.createUser({
//         firstname,
//         lastname,
//         email,
//         password:hasedpassword
//     })
//     const token=user.generateAuthToken();
//     res.status(201).json({token,user})
// }
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
