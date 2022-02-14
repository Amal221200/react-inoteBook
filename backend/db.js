require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE_URL;

const connectToMongoose = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('Connected to database');
    })
}

module.exports = connectToMongoose;