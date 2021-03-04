'use strict';

const mongoose = require('mongoose');
const server = require('./src/server.js');

const MONGODB_URI = 'mongodb://localhost:27017/lab04';

const PORT = process.env.PORT || 3333;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => {
    console.log('Established a connection to DataBase')
    server.start(PORT);
})
  .catch(err => console.error('Something went wrong when connecting to the database', err));
