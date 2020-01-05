import express from 'express';
const router = express.Router();
import isAuth from '../middleware/is-auth';
import parkingsController from '../controllers/parking';
router.get('/parkings',/* should add admin middleware*/ parkingsController.getCurrentParkings);
router.get('/parkings/:id',/* should add admin middleware*/ parkingsController.getSingleParking);
router.get('/parkingOfACarByREGO/:rego',isAuth, parkingsController.getParkingByREGO);


router.post('/parkings',isAuth, parkingsController.postParking);
router.put('/parkings/:id', isAuth,parkingsController.updateParking);
router.delete('/parkings/:id',isAuth, parkingsController.deleteParking);

module.exports = router;