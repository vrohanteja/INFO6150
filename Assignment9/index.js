
// Run "npm init" in assignment  2 folder to generate the package.json
// Entrypoint to the application.
// Can run using "npm start" because we wrote the script for "start" in package.json

require('dotenv').config();

// add Express and Mongoose
const express = require('express');
const mongoose = require('mongoose');
// Importing the routes file
const routes = require('./routes/routes');

// Storing the monagodb url environment variable in mongoString
const mongoString = process.env.DATABASE_URL

// Connecting database to server using Mongoose
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// Storing the contents of express in app
const app = express();
//  app.use takes the base endpoint, and the contents of the routes. All endpoints will now start from '/api'.
app.use('/api', routes)
// listen to changes of the app express file(in json format) on port 3000
app.use(express.json());
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})


