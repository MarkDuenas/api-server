'use strict';

require('@code-fellows/supergoose');

const { app } = require('../src/server.js');
const supertest = require('supertest')
const mockRequest = supertest(app);


const DataCollection = require('../src/models/data-collection.js');
const Animal = require('../src/models/animal.js');
const animal = new DataCollection(Animal);

describe('Server Testing for Animal route functionality', () => {

  it('should return 404 on a bad route', async () => {
    await mockRequest.get('/wrongRoute')
      .then(result => {
        expect(result.status).toEqual(404);
      });
  });

  it('should return 404 on a bad route', async () => {
    await mockRequest.delete('/animal')
      .then(result => {
        expect(result.status).toEqual(404);
      });
  });

  it('should create an animal using POST', async () => {
    const obj = {
      name: 'john',
      type: 'blue',
      legs: 2
    };
    await mockRequest.post('/animal').send(obj)
      .then(result => {
        Object.keys(obj).forEach(key => {
          expect(result.body[key]).toEqual(obj[key]);
        })
        expect(result.status).toEqual(201);
      });
  });

  it('should read a list of animals using GET', async () => {
    const obj = {
      name: 'dave',
      type: 'reptile',
      legs: 4
    };

    animal.create(obj);

    await mockRequest.get('/animal')
      .then(result => {
        expect(result.body.length).toEqual(2);
        expect(result.status).toEqual(200);
      });
  });

  it('should read a list of animals using GET', async () => {
    let idHolder;

    await animal.get()
      .then(result => {
        idHolder = result[0]._id;
      });

    await mockRequest.get(`/animal/${idHolder}`)
      .then(result => {
        expect(result.body.name).toEqual('john');
        expect(result.status).toEqual(200);
      });
  });

  it('should Update an animal using PUT', async () => {
    let idHolder;
    let newUpdatedAnimal = {
      name: 'New guy',
      type: 'mammal',
      legs: 5
    }
    // gets id of index @ 0
    await animal.get()
      .then(result => {
        idHolder = result[0]._id
      });

    await mockRequest.put(`/animal/${idHolder}`).send(newUpdatedAnimal)
      .then(result => {
        Object.keys(newUpdatedAnimal).forEach(key => {
          expect(result.body[key]).toEqual(newUpdatedAnimal[key])
        })
        expect(result.body.name).toEqual('New guy');
        expect(result.status).toEqual(200);
      });
  });

  it('should DELETE an animal using DELETE', async () => {
    let idHolder;
    // gets id of index @ 0
    await animal.get()
      .then(result => {
        idHolder = result[0]._id
      })
    await mockRequest.delete(`/animal/${idHolder}`)
      .then(result => {
        expect(result.status).toEqual(204);
      })
    await animal.get()
      .then(result => {
        expect(result.length).toEqual(1);
      });
  });
})