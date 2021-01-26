const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const { response } = require('../../app');
const app = require('../../app');
const { mongoDevUrl } = require('./../../config');

mongoose
  .connect(mongoDevUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log('Mongo Connection Error: ', err);
  });

const next = (error) => {
  console.log('Error in next:', error);
};

describe('Integration Tests: App wide tests for app.js(working of app+routes):', () => {
  let res;
  beforeEach('res should be some fresh object', () => {
    res = {
      statusCode: 0,
      body: {},
      status: (code) => {
        res.statusCode = code;
        return res;
      },
      json: (reply) => {
        res.body = reply;
        return res;
      },
    };
  });

  //   it('POST /api/auth/signup', function (done) {
  //     request(app)
  //       .post('/api/auth/signup')
  //       .send({
  //         email: `${uuidv4()}@gmail.com`,
  //         password: 'Test@123',
  //       })
  //       .set('Content-type', 'application/json')
  //       .then((res) => {
  //         console.log(res);
  //         assert(res.statusCode, 201);
  //       });
  //   });
});
