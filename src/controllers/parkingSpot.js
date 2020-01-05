const ObjectId = require('mongoose').Types.ObjectId;
import mongoose from 'mongoose';
import ParkingSpot from '../models/parkingSpot';
import ParkingArea from '../models/parkingArea';
import { getAreaByName } from './parkingArea'

module.exports.getAllParkingSpots = (req, res, next) => {
    ParkingSpot.find((err, docs) => {
        if (err)
            return res.status(404).json({ status: false, message: 'Parking Spots not found' });
        else
            return res.status(200).json(docs);
    })
    // .populate('parkingArea', 'name');
}
module.exports.getAllSpotsForAParticularArea = async (req, res, next) => {
    ParkingArea.findOne({ name: req.params.name }, (err, docs) => {
        if (!err) {
            ParkingSpot.find({ parkingArea: mongoose.Types.ObjectId(docs._id) }, (err, docs) => {
                if (!err) {
                    return res.status(200).json(docs);
                }
                else {
                    return res.status(404).json({ status: false, message: 'Parking Spot not found in This Area' });
                }
            })
            return docs;
        }
        else {
            return JSON.stringify({ status: false, message: 'Parking Area not found with this area name' });
        }
    });
}
module.exports.getSingleParkingSpot = (req, res, next) => {
    if (ObjectId.isValid(req.params.id)) {
        ParkingSpot.findById(req.params.id, (err, doc) => {
            if (!err)
                return res.status(200).json(doc);
            else
                return res.status(404).json({ status: false, message: 'Parking Spot not found' });
        });
    }
    else
        return res.status(400).send('No Parking Spot found with that id :' + req.params.id);
}
module.exports.postParkingSpot = async (req, res, next) => {
    let parkingSpot = new ParkingSpot();
    parkingSpot.latitude = req.body.latitude;
    parkingSpot.longitude = req.body.longitude;
    parkingSpot.floorName = req.body.floorName;
    parkingSpot.spotNumber = req.body.spotNumber;
    parkingSpot.allowedTime = req.body.allowedTime;
    parkingSpot.isSpotVacant = req.body.isSpotVacant;
    parkingSpot.parkingArea = '5de10e6eb7fe536768db63ca';
    // console.log(parkingSpot)
    await parkingSpot.save((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            return next(err);
        }
    });
    const parkingArea = await ParkingArea.findById('5de10e6eb7fe536768db63ca');
    parkingArea.parkingSpots.push(parkingSpot);
    await parkingArea.save();
}
module.exports.updateParkingSpot = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No Parking Spot found with that id :' + req.params.id);
    var updatedParkingSpot = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        spotNumber: req.body.spotNumber,  
        floorName: req.body.floorName,
        isSpotVacant: req.body.isSpotVacant,
        allowedTime: req.body.allowedTime
    };

    ParkingSpot.findByIdAndUpdate(req.params.id, { $set: updatedParkingSpot }, { new: true }, (err, doc) => {
        if (!err)
            return res.status(200).json(doc);
        else
            return res.status(404).json({ status: false, message: 'Error in Parking Spot update' });
    });
}
module.exports.deleteParkingSpot = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No Parking Spot found with that id :' + req.params.id);


    ParkingSpot.findByIdAndDelete(req.params.id, async (err, doc) => {
        if (!err) {
            const parkingArea = await ParkingArea.findById('5dd4b8899fe3d16fe08a5241');
            let index = parkingArea.parkingSpots.indexOf(mongoose.Types.ObjectId(req.params.id));
            if (index > -1) {
                parkingArea.parkingSpots.splice(index, 1);
            }
            await parkingArea.save();
            return res.status(200).json(doc);
        }
        else {
            return res.status(404).json({ status: false, message: 'Error in Parking Spot delete' });
        }
    });

}
