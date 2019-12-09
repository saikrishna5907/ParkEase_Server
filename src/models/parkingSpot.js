import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const parkingSpotSchema = new Schema({
    latitude: {
        type:String,
        required:true
    },
    longitude: {
        type:String,
        required:true
    },
    floorName:{
        type:String
    },
    allowedTime: {
        type: String,
        required:true
    },
    isSpotVacant: {
        type: Boolean,
        required:true
    },
    parkingArea: {
        type: Schema.Types.ObjectId,
        ref: 'ParkingArea',
        required :true
    }
})
module.exports = mongoose.model('ParkingSpot', parkingSpotSchema);