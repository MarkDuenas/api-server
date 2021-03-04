'use strict';

const mongoose = require('mongoose');

const PenguinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  cool: Boolean,

  color: {
    type: String,
    required: true
  }
})

const PenguinModel = mongoose.model('penguin', PenguinSchema);

module.exports = PenguinModel;