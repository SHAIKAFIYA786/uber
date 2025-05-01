const mongoose = require('mongoose');
const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

// Function to generate OTP
function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

// // Function to calculate fare based on distance and time
// async function getFare(pickup, destination) {
//     if (!pickup || !destination) {
//         throw new Error('pickup and destination are required');
//     }

//     const distanceTime = await mapService.getDistanceTime(pickup, destination);
//     console.log('Distance and Time:', distanceTime); // Debug log

//     if (!distanceTime || isNaN(distanceTime.distance) || isNaN(distanceTime.time)) {
//         throw new Error('Invalid distance or time data received');
//     }

//     const { distance, time } = distanceTime;

//     const baseFare = {
//         auto: 30,
//         car: 50,
//         motorCycle: 20
//     };

//     const perKmRate = {
//         auto: 10,
//         car: 15,
//         motorCycle: 8
//     };

//     const perMinuteRate = {
//         auto: 2,
//         car: 3,
//         motorCycle: 1.5
//     };

//     return {
//         auto: baseFare.auto + (distance * perKmRate.auto) + (time * perMinuteRate.auto),
//         car: baseFare.car + (distance * perKmRate.car) + (time * perMinuteRate.car),
//         motorCycle: baseFare.motorCycle + (distance * perKmRate.motorCycle) + (time * perMinuteRate.motorCycle)
//     };
// }
async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    console.log('Distance and Time:', distanceTime); // Debug log

    if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
        throw new Error('Invalid distance or time data received');
    }

    // Parse the distance and time
    const distance = parseFloat(distanceTime.distance.replace(/[^\d.-]/g, '')); // Remove any non-numeric characters
    const durationStr = distanceTime.duration;

    // Parse the duration into total minutes (this assumes the format is always "X hour Y mins")
    const timeMatches = durationStr.match(/(\d+)\s*hour.*(\d+)\s*mins/);
    let time = 0;
    if (timeMatches) {
        const hours = parseInt(timeMatches[1]);
        const minutes = parseInt(timeMatches[2]);
        time = hours * 60 + minutes; // Convert time to minutes
    } else {
        throw new Error('Invalid time format in duration');
    }

    if (isNaN(distance) || isNaN(time)) {
        throw new Error('Invalid distance or time data');
    }

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

    return {
        auto: baseFare.auto + (distance * perKmRate.auto) + (time * perMinuteRate.auto),
        car: baseFare.car + (distance * perKmRate.car) + (time * perMinuteRate.car),
        motorCycle: baseFare.motorCycle + (distance * perKmRate.motorCycle) + (time * perMinuteRate.motorCycle)
    };
}

// module.exports= {getFare};


// Main function to create a ride
// module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
//     if (!user || !pickup || !destination || !vehicleType) {
//         throw new Error('All fields are required: user, pickup, destination, vehicleType');
//     }

//     try {
//         const fareObject = await getFare(pickup, destination);

//         // Normalize the vehicleType (to handle case sensitivity)
//         const normalizedVehicleType = vehicleType.toLowerCase();

//         // Check if the normalized vehicleType is valid
//         if (!fareObject[normalizedVehicleType]) {
//             throw new Error(`Invalid vehicle type: ${vehicleType}`);
//         }

//         const fare = fareObject[normalizedVehicleType];
//         const otp = getOtp(6);

//         const ride = await rideModel.create({
//             user,
//             pickup,
//             destination,
//             vehicleType: normalizedVehicleType,
//             otp,
//             fare
//             // captain: to be assigned later, if needed
//         });

//         console.log('✅ Created Ride:', ride);

//         return {
//             message: 'Ride created successfully',
//             ride
//         };
//     } catch (err) {
//         console.error('❌ Error creating ride:', err.message);
//         throw new Error('An error occurred while creating the ride');
//     }
// };
async function createRide({ user, pickup, destination, vehicleType }) {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required: user, pickup, destination, vehicleType');
    }

    try {
        const fareObject = await getFare(pickup, destination);

        // Normalize the vehicleType (to handle case sensitivity)
        const normalizedVehicleType = vehicleType

        // Check if the normalized vehicleType is valid
        if (!fareObject[normalizedVehicleType]) {
            throw new Error(`Invalid vehicle type: ${vehicleType}`);
        }

        const fare = fareObject[normalizedVehicleType];
        const otp = getOtp(6);

        const ride = await rideModel.create({
            user,
            pickup,
            destination,
            vehicleType: normalizedVehicleType,
            otp,
            fare
            // captain: to be assigned later, if needed
        });

        console.log('✅ Created Ride:', ride);

        return {
            message: 'Ride created successfully',
            ride
        };
    } catch (err) {
        console.error('❌ Error creating ride:', err.message);
        throw new Error('An error occurred while creating the ride');
    }
}
module.exports = {
    getFare,
    createRide,
    getOtp
};
