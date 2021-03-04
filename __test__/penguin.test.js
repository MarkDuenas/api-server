'use strict';

require('@code-fellows/supergoose');

const { app } = require('../src/server.js');
const supertest = require('supertest')
const mockRequest = supertest(app);


const DataCollection = require('../src/models/data-collection.js');
const Penguin = require('../src/models/penguin.js');
const penguin = new DataCollection(Penguin);

describe('Server Testing for Animal route functionality', () => {

  it('should return 404 on a bad route', async () => {
    await mockRequest.get('/wrongRoute')
      .then(result => {
        expect(result.status).toEqual(404);
      });
  });

  it('should return 404 on a bad route', async () => {
    await mockRequest.delete('/penguin')
      .then(result => {
        expect(result.status).toEqual(404);
      });
  });

  it('should create a penguin using POST', async () => {
    const obj = {
      name: 'blake',
      cool: true,
      color: "blue"
    };
    await mockRequest.post('/penguin').send(obj)
      .then(result => {
        Object.keys(obj).forEach(key => {
          expect(result.body[key]).toEqual(obj[key]);
        })
        expect(result.status).toEqual(201);
      });
  });

  it('should read a list of penguin using GET', async () => {
    const obj = {
      name: 'bro',
      cool: false,
      color: "white"
    };

    penguin.create(obj);

    await mockRequest.get('/penguin')
      .then(result => {
        expect(result.body.length).toEqual(2);
        expect(result.status).toEqual(200);
      });
  });

  it('should read a list of penguins using GET', async () => {
    let idHolder;

    await penguin.get()
      .then(result => {
        idHolder = result[0]._id;
      });

    await mockRequest.get(`/penguin/${idHolder}`)
      .then(result => {
        expect(result.body.name).toEqual('blake');
        expect(result.status).toEqual(200);
      });
  });

  it('should Update a penguin using PUT', async () => {
    let idHolder;
    let newUpdatedAnimal = {
      name: 'New penguin',
      cool: false,
      color: "red"
    }
    // gets id of index @ 0
    await penguin.get()
      .then(result => {
        idHolder = result[0]._id
      });

    await mockRequest.put(`/penguin/${idHolder}`).send(newUpdatedAnimal)
      .then(result => {
        Object.keys(newUpdatedAnimal).forEach(key => {
          expect(result.body[key]).toEqual(newUpdatedAnimal[key])
        })
        expect(result.body.name).toEqual('New penguin');
        expect(result.status).toEqual(200);
      });
  });

  it('should DELETE a penguin using DELETE', async () => {
    let idHolder;
    // gets id of index @ 0
    await penguin.get()
      .then(result => {
        idHolder = result[0]._id
      })
    await mockRequest.delete(`/penguin/${idHolder}`)
      .then(result => {
        expect(result.status).toEqual(204);
      })
    await penguin.get()
      .then(result => {
        expect(result.length).toEqual(1);
      });
  });
})