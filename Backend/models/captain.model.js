// const mongoose=require('mongoose');
// const jwt=require('jsonwebtoken');
// const bcrypt=require('bcrypt');
// const captainSchema=new mongoose.Schema({
//     fullname:{
//         firstname:{
//             type:String,
//             required: true,
//             minlength:[ 3,'name should have atleast three letters']
//         },
//         lastname:{
//             type:String,
//             minlength:[3,'atleat three characters are required']
//         }
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         lowercase:true,
//     },
//     password:{
//         type:String,
//         required:true,
//         select:false
//     },
//     socketId:{
//         type:String
//     },
//     status:{
//         type:String,
//         enum:['active','inactive'],
//         default:'active'
//     },
//     vehicle:{
//         color:{
//             type:String,
//             required:true,
//             minlength:[3,'we should have atleast three letters']
//         },
//         plate:{
//             type:String,
//             required:true,
//             minlength:[3,'we should have atleast three letters']
//         },
//         capacity:{
//             type:Number,
//             minlength:[1,'atleast it should have one person capacity']
//         },
//         typevehicle:{
//             type:String,
//             required:true,
//             enum:['bike','car','auto'],
//         },
//         location:{
//             lat:{
//                 type:Number
//             },
//             lag:{
//                 type:Number
//             }
//         }
//     }
// })
// captainSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
//     return token;
// }
// captainSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// }
// captainSchema.statics.hashPassword = async function (password) {
//     return await bcrypt.hash(password, 10);
// }

// const captainmodel = mongoose.model('captain', captainSchema);
// module.exports=captainmodel;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true }
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    vehicle: {
        color: { type: String, required: true },
        plate: { type: String, required: true },
        capacity: { type: Number, required: true },
        typevehicle: { type: String, required: true }
    }
});

// ✅ Hash Password (Static Method)
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

// ✅ Compare Passwords
captainSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Generate JWT Token
captainSchema.methods.generateAuthToken = function () {
    // return jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};
// UserSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
//     return token;
// }

const Captain = mongoose.model('Captain', captainSchema);
module.exports = Captain;
