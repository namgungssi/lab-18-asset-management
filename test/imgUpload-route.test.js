'use strict'



const request = require('superagent');
const expect = require('expect');
const Image = require('../models/image');
const mongoose = require('mongoose');

process.env.DB_URL = 'mongodb://<dbuser>:<dbpassword>@ds241668.mlab.com:41668/img';
process.env.AWS_BUCKET = 'namgungssi';
const PORT = 4000;
const HOST = 'http://localhost';
const API = 'api/1.0';


beforeAll(() => {
  require('../lib/_server').start(PORT);
  return Image.remove({});
});

afterAll(() => {
  mongoose.connection.close();
  require('../lib/_server').stop;
});


describe('POST', () => {
  let imgID = '';

  test('creating a new image model returns an ID and a 200', () => {

    return request
      .post('localhost:4000/image')
      .send({ name:'me', path:'../models/files/8f532c2930ad87867d9f22c2ed2601.jpg' })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.text).not.toBe(undefined);
        imgID = res.text;
      });
  });


  test('creating a new image model returns an ID and a 200', () => {
    return request
      .post(`${HOST}:${PORT}/${API}/image/${imgID}/new-image`)
      .field('title', 'me')
      .set({'Content-Type':'multipart/form-data'})
      .attach('photo', `${__dirname}/../models/files/8f532c2930ad87867d9f22c2ed2601.jpg`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.text).not.toBe(undefined);
      });
  });
});
