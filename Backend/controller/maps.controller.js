// const { validationResult } = require('express-validator');
// const mapsService = require('../services/maps.service');

// // Controller function
// module.exports.getCoordinates = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const address = req.query.address;

//   try {
//     // Call service to fetch coordinates
//     const coordinates = await mapsService.getAddressCoordinate(address);
//     res.status(200).json(coordinates);  // Respond with coordinates
//   } catch (err) {
//     res.status(400).json({ message: 'Coordinates not found' });
//   }
// };
const { validationResult } = require('express-validator');
const mapsService = require('../services/maps.service');

// module.exports.getCoordinates = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const address = req.query.address;

//   try {
//     const coordinates = await mapsService.getAddressCoordinate(address);
//     res.status(200).json(coordinates);
//   } catch (err) {
//     res.status(400).json({ message: 'Coordinates not found' });
//   }
// };

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const address = req.query.address; // Use req.query for GET requests

  try {
    const coordinates = await mapsService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (err) {
    res.status(400).json({ message: 'Coordinates not found' });
  }
};

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const address = req.body.address; // Use req.body to get address for POST method

  try {
    const coordinates = await mapsService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (err) {
    res.status(400).json({ message: 'Coordinates not found' });
  }
};

module.exports.getDistanceTime=async (req,res)=>{
   try{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errros:errors.array()});
    }
    const {origin,destination}=req.query;
    const distanceTime=await mapsService.getDistanceTime(origin,destination);
    res.status(200).json(distanceTime);
   }catch(err){
    console.log(err);
    res.status(500).json({message:'Internal server error'})
   }
}

module.exports.getAutoCompleteSuggestions=async (req,res)=>{
    try{
        const errors=validationResult(req);;
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {input}=req.query;
        const suggestions=await mapsService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    }catch(err){
        console.log(err);
        res.status(500).json({message:'Internet Server Error'})
    }
}

