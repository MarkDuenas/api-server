'use strict';

const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  legs: {
    type: Number,
    required: true
  }
})

const AnimalModel = mongoose.model('animal', AnimalSchema);

module.exports = AnimalModel;