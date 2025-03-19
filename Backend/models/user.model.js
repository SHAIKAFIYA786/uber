const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "The first name should have 3 characters"],
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, "The last name should have 3 characters"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "gmail should  have atleast 5 characters"],
    },
    password: {
        type: String,
        required: true,
        //user password wont be sended if use selct =false
        select: false
    },
    socketId: {
        type: String,
    },
});

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const usermodel = mongoose.model('user', UserSchema)
module.exports = usermodel;