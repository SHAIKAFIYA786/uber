const rideModel=require('../models/ride.model');
const mapService=require('./maps.service');
module.exports.createRide=async ({})=>{

}
async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('pickup and destination are required');
    }
    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorCycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorCycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorCycle: 1.5
    };

    const { distance, time } = distanceTime;

    return {
        // 8:14
        auto: baseFare.auto + (distance * perKmRate.auto) + (time * perMinuteRate.auto),
        car: baseFare.car + (distance * perKmRate.car) + (time * perMinuteRate.car),
        motorCycle: baseFare.motorCycle + (distance * perKmRate.motorCycle) + (time * perMinuteRate.motorCycle)
    };
}
function getOtp(num){{
     function generateOtp(num){
        const otp=crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
        return otp;
     }
     return generateOtp(num);
}}

module.exports.CreateRide=async({
    user,pickup,destination,  vehicleType
})=>{ 
    if(!user || !pickup ||!destination ||!vehicleType){
        throw new Error('all fields are required')
    }
    const fare=await getFare(pickup,destination);
    const ride=rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(6),
        fare:fare[vehicleType]
    })
    return false;
}
// 8,5 there is a sslight differenece