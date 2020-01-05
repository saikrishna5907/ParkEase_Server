import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true,'user First Name is required']
    },
    lastName: {
        type: String,
        required: [true,'user Last Name is required']
    },
    email: {
        type: String,
        required: [true,'user email is required'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    vehicleId:{
        type: String,
        unique: true,
        required: [true,'Car registration is required']
    },
    phone: {
        type: String,
        unique: true,
        required: [true,'Contact Number is required']
    }
});
module.exports = mongoose.model('User', userSchema);
