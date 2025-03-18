const userModel=require('../models/user.model');

module.exports.createUser=async ({
    firstname,lastname,email,password
})=>{
    if(!firstname||!email ||!password){
        throw new Error("All fields are required");
    }
    const user=await userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}
// create a readme .md fiel to docs the /users/register endpoint with description and status code adn also write the also write how the data is required at the end point create readme file in the baceknd folder