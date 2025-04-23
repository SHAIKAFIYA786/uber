const rideService=require('../services/ride.service');
const { validationResult } = require("express-validator")

// module.exports.createRide=async(req,res)=>{
//     console.log("hey iam a ride controller");
//     const error=validationResult(req);
//     if(!error.isEmpty()){
//         return res.status(400).json({errors:error.array()});
//     }
//     const {pickup,destination,vehicleType}=req.query;
//     try{ 
//         const ride=await rideService.createRide({user:req.user._id,pickup,destination,vehicleType})
//         console.log("hey i went");
//         console.log(ride);
//         return res.status(201).json(ride);
//     }catch(err){
//         return res.status(500).json({message:err.message});
//     }
// }
module.exports.createRide = async (req, res) => {
    console.log(req.body);
    console.log("hey iam a ride controller");
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    // Use req.body to get the data sent in the request body
    const { pickup, destination, vehicleType } = req.body;
    
    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        console.log("hey i went");
        console.log(ride);
        return res.status(201).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
