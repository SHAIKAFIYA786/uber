const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const userController=require('../controller/user.controller');
const authMiddleware=require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage("inavalid email"),
    body('fullname.firstname').isLength({min:3}).withMessage("name should be 3 letterd"),
    body('password').isLength({min:6}).withMessage("password must be more than 6 letters")
],
userController.registerUser
)
router.post('/login',[
    body('email').isEmail().withMessage("inavalid email"),
    body('password').isLength({min:6}).withMessage("password must be more than 6 letters")
],userController.loginUser
)
router.get('/profile',authMiddleware.authMiddleware,userController.getProfile)
module.exports=router;