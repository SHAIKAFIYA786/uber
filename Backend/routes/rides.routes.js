const express = require('express');
const { query, validationResult } = require('express-validator');
const authMiddleware  = require('../middlewares/auth.middleware');
const ridesController=require('../controller/rides.controller')
const router = express.Router();

router.post('/createRide',
    authMiddleware.authMiddleware,
    [
        query('pickup').isString().isLength({min:3}).withMessage('pickup location is required'),
        query('destination').isString().isLength({min:3}).withMessage('destination is required'),
        query('vehicleType').isString().isLength({min:3}).withMessage('vehicleType is required')
    ],
    ridesController.createRide
);

module.exports = router;