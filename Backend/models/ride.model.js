const mongoose=require('mongoose');

const rideSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserSchema',
        required:true
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'captainSchema'
    },
    pickup:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    vehicleType: { // Add this line to store vehicleType
        type: String,
        enum: ['auto', 'car', 'motorCycle'], // Ensure this matches your allowed values
        required: true
    },
    status:{
        type:String,
        enum:['pending','accepted','ongoing','completed','cancel'],
        default:'pending'
    },
    duration:{
        type:Number
    },
    distance:{
        type:Number
    },
    paymentId:{
        type:String,
    },
    orderId:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:String,
        select:false,
        required:true
    }
})
module.exports=mongoose.model('ride',rideSchema);