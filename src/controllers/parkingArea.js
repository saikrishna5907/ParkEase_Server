const ObjectId = require('mongoose').Types.ObjectId;
const ParkingArea = require('../models/parkingArea');

module.exports.getAllParkingAreas = async (req, res, next) =>{
    await ParkingArea.find((err, docs) => {
        if(err)
            return res.status(404).json({status: false, message: 'Parking Areas not found'});
        else
            return res.status(200).json(docs);
    })
    // .populate('parkingSpots')
}
module.exports.getAreaByName = (req, res, next) => {
    ParkingArea.find({name: req.params.name}, (err,docs) => {
        if(!err){
            return res.status(200).json(docs);
        }
        else {
            return res.status(404).json({status: false, message: 'Parking Area not found with this area name'});
        }
    });
}

module.exports.getSingleParkingArea =(req, res, next) =>{
  if(ObjectId.isValid(req.params.id)){
    ParkingArea.findById(req.params.id, (err,doc) => {
        if(!err)
            return res.status(200).json(doc);
        else
            return res.status(404).json({status: false, message: 'Parking Area not found'});
    });
}
else
    return res.status(400).send('No Parking Area found with that id :' + req.params.id );
}
module.exports.postParkingArea = (req, res, next)=> {
    let parkingArea = new ParkingArea();
    parkingArea.name = req.body.name;
    parkingArea.latitude = req.body.latitude;
    parkingArea.noOfFloors = req.body.noOfFloors;
    parkingArea.longitude = req.body.longitude;
    parkingArea.totalParkingSpots = req.body.totalParkingSpots;
    parkingArea.noOfOccupiedSpots = req.body.noOfOccupiedSpots;
    parkingArea.save((err,docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
                return next(err);
        }
     });

}
module.exports.updateParkingArea = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No Parking Area found with that id :' + req.params.id );
    var updatedParkingArea = {
        name : req.body.name,
        location: req.body.location,
        noOfFloors: req.body.noOfFloors,
        totalParkingSpots : req.body.totalParkingSpots,
        noOfoccupiedSpots : req.body.noOfoccupiedSpots,
        noOfAvailableSpots: req.body.noOfAvailableSpots,
        spotIdForDisables: req.body.spotIdForDisables
    };

    ParkingArea.findByIdAndUpdate(req.params.id, {$set: updatedParkingArea},{new : true}, (err, doc) => {
        if(!err)
                return res.status(200).json(doc);
            else
                return res.status(404).json({status: false, message: 'Error in Parking Area update'});
    });
}
module.exports.deleteParkingArea = (req,res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No Parking Area found with that id :' + req.params.id );

    ParkingArea.findByIdAndDelete(req.params.id, (err, doc) => {
        if(!err)
                return res.status(200).json(doc);
            else
                return res.status(404).json({status: false, message: 'Error in Parking Area delete'});
    });
}
