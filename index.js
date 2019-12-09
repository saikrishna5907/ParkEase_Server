import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import ParkingAreaRoutes from './src/routes/parkingArea';
import ParkingSpotRoutes from './src/routes/parkingSpot';
import StudentRoutes from './src/routes/student';
import ParkingRoutes from './src/routes/parking'; 
require ('./src/config/config');
require('./src/models/db');
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api',ParkingAreaRoutes);
app.use('/api',ParkingSpotRoutes);
app.use('/api', StudentRoutes);
app.use('/api', ParkingRoutes);


app.listen(port, ()=> {
    console.log(`Server is running on port : ${port}`);
});