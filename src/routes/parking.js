import express from 'express';
const router = express.Router();
import parkingsController from '../controllers/parking';
router.get('/parkings', parkingsController.getCurrentParkings);
router.get('/parkings/:id', parkingsController.getSingleParking);
router.get('/parkingOfACarByREGO/:rego', parkingsController.getParkingByREGO);


router.post('/parkings', parkingsController.postParking);
router.put('/parkings/:id', parkingsController.updateParking);
router.delete('/parkings/:id', parkingsController.deleteParking);

module.exports = router;