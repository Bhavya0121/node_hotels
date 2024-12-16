const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels'

//set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser :true,
    useUnifiedTopology : true
})

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to MongoDB server");

})

db.on('error',(err)=>{
    console.log("MongoDB connection error",(err));
})

db.on('disconnected',()=>{
    console.log("MongoDB connection Disconnected");
})

//Export the db connection
module.exports = db;