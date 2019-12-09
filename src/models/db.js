const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, 'useCreateIndex': true,  useUnifiedTopology: true }, (err) => {
    if(!err) {console.log('MongoDB Connection successfull..');}
    else{ console.log('Error in connecting to MongoDB' + JSON.stringify(err,undefined,2));}
});

