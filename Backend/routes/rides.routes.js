// const express = require('express');
// const { query, validationResult } = require('express-validator');
// const authMiddleware  = require('../middlewares/auth.middleware');
// const ridesController=require('../controller/rides.controller')
// const router = express.Router();

// router.post('/createRide',
//     authMiddleware.authMiddleware,
//     [
//         query('pickup').isString().isLength({min:3}).withMessage('pickup location is required'),
//         query('destination').isString().isLength({min:3}).withMessage('destination is required'),
//         query('vehicleType').isString().isLength({min:3}).withMessage('vehicleType is required')
//     ],
//     ridesController.createRide
// );

// module.exports = router;
const express = require('express');
const { body,query,validationResult } = require('express-validator'); // Change query to body
const authMiddleware = require('../middlewares/auth.middleware');
const ridesController = require('../controller/rides.controller');
const router = express.Router();

// Route to create a ride
router.post('/createRide',
    authMiddleware.authMiddleware,
    [
        body('pickup').isString().isLength({ min: 3 }).withMessage('pickup location is required'),
        body('destination').isString().isLength({ min: 3 }).withMessage('destination is required'),
        body('vehicleType').isString().isLength({ min: 3 }).withMessage('vehicleType is required')
    ],
    ridesController.createRide
);
// router.get('/get-Fare',
//     authMiddleware.authMiddleware,
//     [
//         body('pickup').isString().isLength({ min: 3 }).withMessage('pickup location is required'),
//         body('destination').isString().isLength({ min: 3 }).withMessage('destination is required'),
//         // body('vehicleType').isString().isLength({ min: 3 }).withMessage('vehicleType is required')
//     ],
//     ridesController.getFare
// );
router.get('/get-Fare',
    authMiddleware.authMiddleware,
    [
        query('pickup').isString().isLength({ min: 3 }).withMessage('pickup location is required'),
        query('destination').isString().isLength({ min: 3 }).withMessage('destination is required'),
    ],
    ridesController.getFare
);

module.exports = router;
