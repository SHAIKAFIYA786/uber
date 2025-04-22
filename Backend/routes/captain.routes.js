const captainmodel=require('../models/captain.model')
const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const { validationResult } = require('express-validator');
const captainController=require('../controller/captain.controller');
console.log("captainController:", captainController);

router.post('/register', [
    body('email').isEmail().withMessage('please enter a valid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('name should have atleast three letters'),
    body('fullname.lastname').isLength({min:3}).withMessage('name should have atleast three letters'),
    body('password').isLength({min:6}).withMessage('password should have atleast 6 letters'),
    body('vehicle.color').isLength({min:3}).withMessage('color should have atleast 3 letters'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate should have atleast 3 letters'),
    body('vehicle.capacity').isLength({min:1}).withMessage('capacity should have atleast 1 person'),
    body('vehicle.typevehicle').isIn(['bike','car','auto']).withMessage('vehicle type should be bike, car or auto'),
],captainController.registerCaptain);
router.post('/login', [
    body('email').isEmail().withMessage('please enter a valid email'),
    body('password').isLength({min:6}).withMessage('password should have atleast 6 letters')
],captainController.loginCaptain);
module.exports=router;