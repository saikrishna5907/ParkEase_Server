import express from 'express';
const router = express.Router();
import isAuth from '../middleware/is-auth';
import parkingSpotController from '../controllers/parkingSpot';
router.get('/parkingSpots', isAuth,parkingSpotController.getAllParkingSpots);

router.get('/parkingSpotsInParticularArea/:name', isAuth,parkingSpotController.getAllSpotsForAParticularArea);

router.get('/parkingSpots/:id',isAuth, parkingSpotController.getSingleParkingSpot);
router.post('/parkingSpots', /* should add admin middleware*/ parkingSpotController.postParkingSpot);
router.put('/parkingSpots/:id', isAuth,parkingSpotController.updateParkingSpot);
router.delete('/parkingSpots/:id',/* should add admin middleware*/parkingSpotController.deleteParkingSpot);

module.exports = router;