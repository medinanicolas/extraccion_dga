const mongoose = require('mongoose');

//const MONGO_URI = 'mongodb://admin:password@localhost:27017/';

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
        console.error('Error connecting to MongoDB', err);
});
