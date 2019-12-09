import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    firstName: {
        type: String,
        required: [true,'Student First Name is required']
    },
    lastName: {
        type: String,
        required: [true,'Student Last Name is required']
    },
    studentId: {
        type: String,
        unique: true,
        dropDups: true,
        required: [true,'Student number is required']
    },
    email: {
        type: String,
        required: [true,'Student email is required'],
        unique: true
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
module.exports = mongoose.model('Student', studentSchema);
