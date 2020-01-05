var ObjectId = require('mongoose').Types.ObjectId;
import User from '../models/user';
import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
//to get all Users information
//authorize to admin only
module.exports.getAllUsers = (req, res, next) => {
    User.find((err, docs) => {
        if (!docs)
            return res.status(404).json({ status: false, message: 'Users not found' });
        else
            return res.status(200).json(docs);
    })
}
module.exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ status: false, message: 'Email Address Does not found...!' });
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password)
        })
        .then(isEqual => {
            if (!isEqual) {
                return res.status(404).json({ status: false, message: 'Wrong Password...!' });
            }
            if (loadedUser) {
                // const expirationDate = new Date().getTime() + 
                const token = jwt.sign({
                    email: loadedUser.email,
                    userId: loadedUser._id.toString(),
                    vehicleId: loadedUser.vehicleId,
                    firstName: loadedUser.firstName,
                    lastName: loadedUser.lastName,
                    phone: loadedUser.phone
                }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ token: token, userId: loadedUser._id.toString()})
            }
        });
}
//to get single User information
module.exports.getSingleUser = (req, res, next) => {
    if (ObjectId.isValid(req.params.id)) {
        User.findById(req.params.id, (err, doc) => {
            if (!err)
                return res.status(200).json(doc);
            else
                return res.status(404).json({ status: false, message: 'User not found' });
        });
    }
    else
        return res.status(400).send('No User found with that id :' + req.params.id);
}
// to create a new User record
module.exports.postUser = (req, res, next) => {
    const lowerCaseREGO = req.body.vehicleId.toLowerCase();
    bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            let user = new User();
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.userId = req.body.userId;
            user.email = req.body.email;
            user.password = hash;
            user.vehicleId = lowerCaseREGO;
            user.phone = req.body.phone;
            user.save((err, docs) => {
                if (!err) {
                    res.status(201).json({ message: 'SignUp Successful...!', userId: docs._id });
                }
                else {
                    return res.status(404).json({ status: false, message: 'SignUp Unsuccessfull...!' });
                }
            });

        })
    })
}
// to update an existing User record
module.exports.updateUser = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No User found with that id :' + req.params.id);
    var updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userId: req.body.userId,
        email: req.body.email,
        vechicleId: req.body.vechicleId,
        phone: req.body.phone
    };

    User.findByIdAndUpdate(req.params.id, { $set: updatedUser }, { new: true }, (err, doc) => {
        if (!err)
            return res.status(200).json(doc);
        else
            return res.status(404).json({ status: false, message: 'Error in User update' });
    });
}
// to delete a User record
module.exports.deleteUser = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No User found with that id :' + req.params.id);

    User.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err)
            return res.status(200).json(doc);
        else
            return res.status(404).json({ status: false, message: 'Error in User delete' });
    });
}
