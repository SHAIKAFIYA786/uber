const captainModel = require("../models/captain.model");
module.exports.createCaptain = async ({firstname,lastname,email,password,color,plate,capacity,typevehicle}) =>{
    if(!firstname||!lastname||!email||!password||!color||!plate||!capacity ||!typevehicle){
        return new Error("All fields are required");
    }
    const createdCaptain=await captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            typevehicle
        }
    })
    return createdCaptain;
}
 