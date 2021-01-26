const assert = require('assert');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { mongoDevUrl } = require('./../../config');
const { signup, login } = require('../../controllers/auth-controller');

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
  // console.log('Error in next:', error);
};

const commonReq = {
  body: {
    email: `${uuidv4()}@gmail.com`,
    password: 'Test@123',
  },
};

describe('Unit Tests: Test for controllers/auth-controller.js:', () => {
  let req, res;
  beforeEach('req and res should be some fresh objects', () => {
    req = {
      body: {
        email: `${uuidv4()}@gmail.com`,
        password: 'Test@123',
      },
    };

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

  it('should signup a random user', function (done) {
    signup(req, res, next)
      .then(function () {
        assert.ok(res.statusCode === 201);
        assert.ok(
          res.body.adminId &&
            res.body.email.length > 0 &&
            res.body.token.length > 0
        );
        done();
      })
      .catch(function (err) {
        done(new Error(`Couldn't signup a random user`));
      });
  });

  it('should signup a unique user', function (done) {
    signup(commonReq, res, next)
      .then(function () {
        assert.ok(res.statusCode === 201);
        assert.ok(
          res.body.adminId &&
            res.body.email.length > 0 &&
            res.body.token.length > 0
        );
        done();
      })
      .catch(function (err) {
        done(new Error(`Couldn't signup user(registred, not removed?!)`));
      });
  });

  it(`shouldn't login local request coz uuid will be unique`, function (done) {
    login(req, res, next)
      .then(function () {
        done();
      })
      .catch(function (err) {
        done(new Error(`Logged in a random user?!`));
      });
  });

  it('should login the common request', function (done) {
    login(commonReq, res, next)
      .then(function () {
        assert.ok(res.statusCode === 200);
        assert.ok(
          res.body.adminId &&
            res.body.adminEmail.length > 0 &&
            res.body.token.length > 0
        );
        done();
      })
      .catch(function (err) {
        done(new Error(`Couldn't login the common test user!`));
      });
  });
});
