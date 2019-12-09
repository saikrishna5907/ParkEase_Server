import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const parkingAreaSchema = new Schema({
    name: {
        type:String,
        unique:true,
        required: true
    },
    noOfFloors: {
        type:Number
    },
    latitude: {
        type:String,
        required:true
    },
    longitude: {
        type:String,
        required:true
    },
    totalParkingSpots:  {
        type:Number,
        required:true
    },
    noOfOccupiedSpots:  {
        type:Number,
        required:true
    },
    parkingSpots: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ParkingSpot' 
        }
    ]
});

module.exports = mongoose.model('ParkingArea', parkingAreaSchema);