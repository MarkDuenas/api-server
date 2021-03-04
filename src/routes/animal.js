'use strict';

const express = require('express');

const DataCollection = require('../models/data-collection.js');
const AnimalModel = require('../models/animal.js');

const animals = new DataCollection(AnimalModel);

const animalRouter = express.Router();

animalRouter.get('/animal', getAllAnimal);
animalRouter.get('/animal/:id', getOneAnimal);
animalRouter.post('/animal', createAnimal);
animalRouter.put('/animal/:id', updateAnimal);
animalRouter.delete('/animal/:id', deleteAnimal);

async function getAllAnimal(req, res) {
  let all =  await animals.get();
  res.status(200).json(all);
} 

async function getOneAnimal(req, res) {
  let id = req.params.id;
  let animal = await animals.get(id);
  res.status(200).json(animal);
}

async function createAnimal(req, res) {
  let obj = req.body;
  let newAnimal = await animals.create(obj);
  res.status(201).json(newAnimal);
}

async function updateAnimal(req, res) {
  let id = req.params.id;
  let content = req.body;
  let updated = await animals.update(id, content);
  res.status(200).json(updated);
}

async function deleteAnimal(req, res) {
  let id = req.params.id;
  let deleted = await animals.delete(id);
  res.status(204).json(deleted);
}

module.exports = animalRouter;