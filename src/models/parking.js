import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const parkingSchema = new Schema({
    // parkingArea: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'ParkingArea'
    // },
    parkingSpot: {
        type: Schema.Types.ObjectId,
        ref: 'ParkingSpot'
    },
    vehicleOwnedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    parkedVehicleRego:{
        type: String,
        required: true,
        unique:true
    },
},
{ timestamps: true });

module.exports = mongoose.model('Parking', parkingSchema);