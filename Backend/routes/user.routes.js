const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const { validationResult } = require('express-validator');
const userController=require('../controller/user.controller');
const authMiddleware=require('../middlewares/auth.middleware');

router.post('/register', 
    [
      body('email').isEmail().withMessage("invalid email"),
      body('fullname.firstname').isLength({ min: 3 }).withMessage("name should be 3 lettered"),
      body('password').isLength({ min: 6 }).withMessage("password must be more than 6 letters"),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next(); // ✅ GO TO controller
      }
    ], 
    userController.registerUser);
    
router.post('/login',[
    body('email').isEmail().withMessage("inavalid email"),
    body('password').isLength({min:6}).withMessage("password must be more than 6 letters")
],userController.loginUser
)
router.get('/profile',authMiddleware.authMiddleware,userController.getProfile)
router.get('/logout',authMiddleware.authMiddleware,userController.logout)
module.exports=router;