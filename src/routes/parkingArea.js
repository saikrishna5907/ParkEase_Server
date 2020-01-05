import express from 'express';
import isAuth from '../middleware/is-auth';

const router = express.Router();
const parkingAreaController = require('../controllers/parkingArea');
router.get('/parkingAreas', isAuth ,parkingAreaController.getAllParkingAreas);
router.get('/parkingAreas/:id', isAuth,parkingAreaController.getSingleParkingArea);
router.get('/parkingAreasByName/:name',isAuth, parkingAreaController.getAreaByName);
router.post('/parkingAreas', /* should add admin middleware*/parkingAreaController.postParkingArea);
router.put('/parkingAreas/:id', /* should add admin middleware*/parkingAreaController.updateParkingArea);
router.delete('/parkingAreas/:id', /* should add admin middleware*/parkingAreaController.deleteParkingArea);

module.exports = router;