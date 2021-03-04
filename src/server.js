'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

const notFoundHandler = require('./error-handlers/404.js');
const error = require('./error-handlers/500.js');

const animalRouter = require('./routes/animal.js');
const penguinRouter = require('./routes/penguin.js');

app.use(express.json());
app.use(cors());

app.use(animalRouter);
app.use(penguinRouter);

app.use('*', notFoundHandler);
app.use(error);

module.exports = {
  app: app,
  start: port => {
    app.listen( port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
}