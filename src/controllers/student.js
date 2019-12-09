// import ObjectId from 'mongoose.Types.ObjectId';
var ObjectId = require('mongoose').Types.ObjectId;
import Student from '../models/student';

//to get all students information
module.exports.getAllStudents = (req, res, next) => {
    Student.find((err, docs) => {
        if (!docs)
            return res.status(404).json({ status: false, message: 'students not found' });
        else
            return res.status(200).json(docs);
    })
}
//to get single student information
module.exports.getSingleStudent = (req, res, next) => {
    if (ObjectId.isValid(req.params.id)) {
        Student.findById(req.params.id, (err, doc) => {
            if (!err)
                return res.status(200).json(doc);
            else
                return res.status(404).json({ status: false, message: 'student not found' });
        });
    }
    else
        return res.status(400).send('No student found with that id :' + req.params.id);
}
// to create a new student record
module.exports.postStudent = (req, res, next) => {
    const lowerCaseREGO = req.body.vehicleId.toLowerCase();
    let student = new Student();
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.studentId = req.body.studentId;
    student.email = req.body.email;
    student.vehicleId = lowerCaseREGO;
    student.phone = req.body.phone;
    student.save((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            return next(err);
        }
    });
}
// to update an existing student record
module.exports.updateStudent = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No student found with that id :' + req.params.id);
    var updatedStudent = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        studentId: req.body.studentId,
        email: req.body.email,
        vechicleId: req.body.vechicleId,
        phone: req.body.phone
    };

    Student.findByIdAndUpdate(req.params.id, { $set: updatedStudent }, { new: true }, (err, doc) => {
        if (!err)
            return res.status(200).json(doc);
        else
            return res.status(404).json({ status: false, message: 'Error in student update' });
    });
}
// to delete a student record
module.exports.deleteStudent = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No student found with that id :' + req.params.id);

    Student.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err)
            return res.status(200).json(doc);
        else
            return res.status(404).json({ status: false, message: 'Error in student delete' });
    });
}
