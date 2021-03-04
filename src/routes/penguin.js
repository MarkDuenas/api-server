'use strict';

const express = require('express');

const DataCollection = require('../models/data-collection.js');
const PenguinModel = require('../models/penguin.js');

const penguins = new DataCollection(PenguinModel);

const penguinRouter = express.Router();

penguinRouter.get('/penguin', getAllPenguin);
penguinRouter.get('/penguin/:id', getOnePenguin);
penguinRouter.post('/penguin', createPenguin);
penguinRouter.put('/penguin/:id', updatePenguin);
penguinRouter.delete('/penguin/:id', deletePenguin);

async function getAllPenguin(req, res) {
  let all = await penguins.get();
  res.status(200).json(all);
}

async function getOnePenguin(req, res) {
  let id = req.params.id;
  let Penguin = await penguins.get(id);
  res.status(200).json(Penguin);
}

async function createPenguin(req, res) {
  let obj = req.body;
  let newPenguin = await penguins.create(obj);
  res.status(201).json(newPenguin);
}

async function updatePenguin(req, res) {
  let id = req.params.id
  let content = req.body;
  let updated = await penguins.update(id, content);
  res.status(200).json(updated);
}

async function deletePenguin(req, res) {
  let id = req.params.id
  let deleted = await penguins.delete(id);
  res.status(204).json(deleted);
}

module.exports = penguinRouter;