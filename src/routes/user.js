import express from 'express';
const router = express.Router();

const userController = require('../controllers/user');
router.post('/login', userController.login)
router.get('/users', userController.getAllUsers);
router.post('/user', userController.postUser);
router.get('/users/:id', userController.getSingleUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
module.exports = router;

