const express = require('express');
const { query } = require('express-validator');
const router = express.Router();
const mapController = require('../controller/maps.controller');
const authMiddleware = require('../middlewares/auth.middleware');
console.log(mapController); // This will show you what functions are available

router.get(
  '/get-coordinates',
  authMiddleware.authMiddleware,
  query('address').isString().isLength({ min: 3 }),
  mapController.getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authMiddleware.authMiddleware,
    mapController.getDistanceTime   
)

router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authMiddleware.authMiddleware,
    mapController.getAutoCompleteSuggestions
)

module.exports = router;



