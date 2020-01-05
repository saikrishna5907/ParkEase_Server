const ObjectId = require('mongoose').Types.ObjectId;
import Parking from '../models/parking';
import User from '../models/user';
module.exports.getCurrentParkings = (req, res, next) => {
    Parking.find((err, docs) => {
        if (!err)
            return res.status(200).json(docs);
        else {
            console.log(err)
            return res.status(404).json({ status: false, message: 'No Records of Parking Status found.' });
        }
    })
        .populate([
            {
                path: 'vehicleOwnedBy',
                model: 'User',
                select: 'firstName lastName email vehicleId phone'
            }
        ])
        .populate([
            {
                path: 'parkingSpot',
                model: 'ParkingSpot',
                populate: {
                    path: 'parkingArea',
                    model: 'ParkingArea',
                    select: 'latitude longitude name noOfFloors'
                }

            }
        ])

}
module.exports.getSingleParking = (req, res, next) => {
    if (ObjectId.isValid(req.params.id)) {
        Parking.findById(req.params.id, (err, doc) => {
            if (!err)
                return res.status(200).json(doc);
            else
                return res.status(404).json({ status: false, message: 'Parking Status not found' });
        });
    }
    else
        return res.status(400).send('No Parking Status found with that id :' + req.params.id);
}
module.exports.getParkingByREGO = (req, res, next) => {
    let lowerCaseRegoValue = req.params.rego.toLowerCase();
    Parking.find({ 'parkedVehicleRego': lowerCaseRegoValue }, (err, doc) => {
        if (!err) {
            return res.status(200).json(doc);
        }
        else
            return res.status(404).json({ status: false, message: `Parking Status with registration number: ${req.params.rego} not found` });
    })
        .populate([
            {
                path: 'vehicleOwnedBy',
                model: 'User',
                select: 'firstName lastName email vehicleId phone'
            }
        ])
        .populate([
            {
                path: 'parkingSpot',
                model: 'ParkingSpot',
                populate: {
                    path: 'parkingArea',
                    model: 'ParkingArea',
                    select: 'latitude longitude name noOfFloors'
                }

            }
        ])


}

module.exports.postParking = async (req, res, next) => {
    const lowerCaseREGOValue = req.body.parkedVehicleRego.toLowerCase();
    //find user with the vehicle rego recognized by image processing
    const user = await User.findOne({ vehicleId: lowerCaseREGOValue });
    // let recordFound;
    // let duplicateRecordDataId= '';
    // ParkingStatusOfSpots.find({'parkedVehicleRego': lowerCaseRegoValue}, (err,doc) => {
    //     //record found true
    //     if(!err && doc != null){
    //         recordFound = true;
    //         console.log('45record found'+recordFound);
    //         // console.log('docssssss'+ )
    //         if(doc!= null){
    //             console.log(doc)
    //         // duplicateRecordDataId = doc[0]._id
    //         }
    //     }
    // });
    //to confirm that there is no record in parking status collection with same rego number 
    // if(recordFound === false){
    //     console.log('falseee')
    let parking = await new Parking({
        parkingSpot: '5de73a2fc75f0c242093f264',
        vehicleOwnedBy: user,
        parkedVehicleRego: lowerCaseREGOValue
    });

    await parking.save((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            return next(err);
        }
    });
    // }
    //if duplicate record found with same rego number then update the old record
    // else if(recordFound === true){
    //     console.log('trueeeee'+duplicateRecordDataId)
    //     var updatedParkingStautsOfASpot = {
    //         parkingAreaId: req.body.parkingAreaId,
    //         parkingSpotId: req.body.parkingSpotId,
    //         parkedVehicleRego : lowerCaseRegoValue,
    //         startTimeOfParking : req.body.startTimeOfParking
    //     };
    //     ParkingStatusOfSpots.findByIdAndUpdate(duplicateRecordData._id, {$set: updatedParkingStautsOfASpot},{new : true}, (err, doc) => {
    //         if(!err)
    //                 return res.status(200).json(doc);
    //             else 
    //                 return res.status(404).json({status: false, message: 'Error in Parking Status update'});
    //     });
    // }


}
module.exports.updateParking = (req, res, next) => {
    const lowerCaseRegoValue = req.body.parkedVehicleRego.toLowerCase();

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No Parking Status found with that id :' + req.params.id);
    var updatedParkingStautsOfASpot = {
        parkingAreaId: req.body.parkingAreaId,
        parkingSpotId: req.body.parkingSpotId,
        parkedVehicleRego: lowerCaseRegoValue,
        startTimeOfParking: req.body.startTimeOfParking
    };

    Parking.findByIdAndUpdate(req.params.id, { $set: updatedParkingStautsOfASpot }, { new: true }, (err, doc) => {
        if (!err)
            return res.status(200).json(doc);
        else
            return res.status(404).json({ status: false, message: 'Error in Parking Status update' });
    });
}
module.exports.deleteParking = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No Parking Status found with that id :' + req.params.id);

    Parking.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err)
            return res.status(200).json(doc);
        else
            return res.status(404).json({ status: false, message: 'Error in Parking Status delete' });
    });
}