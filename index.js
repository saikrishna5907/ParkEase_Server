import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import ParkingAreaRoutes from './src/routes/parkingArea';
import ParkingSpotRoutes from './src/routes/parkingSpot';
import UserRoutes from './src/routes/user';
import ParkingRoutes from './src/routes/parking'; 
require ('./src/config/config');
require('./src/models/db');
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
        );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// app.use(cors());
app.use(bodyParser.json());
app.use('/api',ParkingAreaRoutes);
app.use('/api',ParkingSpotRoutes);
app.use('/api', UserRoutes);
app.use('/api', ParkingRoutes);


app.listen(port, ()=> {
    console.log(`Server is running on port : ${port}`);
});