const assert = require('assert');
const mongoose = require('mongoose');
const { mongoDevUrl } = require('./../../config');
const { signup, login } = require('../../controllers/auth-controller');
const { v4: uuidv4 } = require('uuid');

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

const commonReq = {
  body: {
    name: 'Himanshu Yadav',
    email: 'himanshu.yadav@hyperverge.co',
    password: 'Test@123',
  },
};

describe('Test for controllers/auth-controller.js:', () => {
  let req, res;
  beforeEach('req and res should be some fresh objects', () => {
    req = {
      body: {
        name: 'Test User',
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

  it('should signup a local request(not http)', () => {
    signup(req, res, next).then((done) => {
      assert.ok(res.statusCode === 201);
      assert.ok(
        res.userId &&
          res.email.length > 0 &&
          res.token.length > 0 &&
          res.userName.length > 0
      );
      done();
    });
  });

  it('should signup a dummy user to test in login part', () => {
    signup(commonReq, res, next).then((done) => {
      assert.ok(res.statusCode === 201);
      assert.ok(
        res.userId &&
          res.email.length > 0 &&
          res.token.length > 0 &&
          res.userName.length > 0
      );
      done();
    });
  });

  it(`shouldn't login local request coz uuid will be unique`, () => {
    login(req, res, next).then((done) => {
      assert.ok(res.statusCode === 403);
      assert.ok(!res.email && !res.token && !res.userName);
      done();
    });
  });

  it(`should login the common request`, () => {
    login(commonReq, res, next).then((done) => {
      assert.ok(res.statusCode === 200);
      assert.ok(
        res.userId &&
          res.email.length > 0 &&
          res.token.length > 0 &&
          res.userName.length > 0
      );
      done();
    });
  });
});
