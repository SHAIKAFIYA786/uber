const rideService=require('../services/ride.service');
const { validationResult } = require("express-validator")
const mapService=require("../services/maps.service")
const { sendMessageToSocketId } = require('../socket');
const rideModel=require('../models/ride.model');
const captainModel=require('../models/captain.model')
const userModel=require('../models/user.model')


// module.exports.createRide=async(req,res)=>{
//     console.log("hey iam a ride controller");
//     const error=validationResult(req);
//     if(!error.isEmpty()){
//         return res.status(400).json({errors:error.array()});
//     }
//     const {pickup,destination,vehicleType}=req.query;
//     try{ 
//         const ride=await ride.jsService.createRide({user:req.user._id,pickup,destination,vehicleType})
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
        console.log(req.user)
        console.log("hey i went");
        // console.log(ride);
        // res.status(201).json(ride);
        const PickUpCoordinates=await mapService.getAddressCoordinate(pickup)
        console.log(PickUpCoordinates);
        const captainsInRadius=await mapService.getCaptainsInTheRadius(PickUpCoordinates.lat,PickUpCoordinates.lng,100)
        ride.otp="";
        // console.log("Sending to captain's socket:", captain.socketId);
        // const rideWithUser = await userModel.findOne({ _id:req.user._id });
        const rideWithUser = await rideModel.findOne({ _id:ride.ride._id }).populate('user');
        captainsInRadius.map(captain => {
            console.log("hey we are the socket ids",captain.socketId);
             sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })
        console.log("hey iam with ridewithUser",rideWithUser);
        console.log("total",captainsInRadius);
        res.status(201).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports.getFare=async (req,res)=>{
    console.log("iam in getfare controller");
    console.log(req.query);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }
    const { pickup, destination} = req.query;
    try{
        const fare=await rideService.getFare(pickup,destination);
        return res.status(200).json(fare);
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}