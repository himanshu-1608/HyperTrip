const assert = require('assert');
const mongoose = require('mongoose');
const { mongoDevUrl } = require('./../../config');
const { addBus, resetBus } = require('../../controllers/admin-controller');

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

describe('Unit Tests: Test for controllers/admin-controller.js:', () => {
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

  it('should add a bus', function (done) {
    let req = {
      body: {
        name: 'Chandigarh-Delhi Punjab Roadways',
        bus_no: 'PB01-123456',
        fare: '120',
        src: 'Punjab',
        dest: 'Delhi',
        src_time: new Date(2021, 1, 31, 10, 30, 0, 0),
        dest_time: new Date(2021, 1, 31, 13, 30, 0, 0),
      },
    };
    addBus(req, res, next)
      .then(function () {
        assert.ok(res.statusCode === 201);
        assert.ok(res.body.created === true);
        done();
      })
      .catch(function (err) {
        done(new Error('New Bus is not created'));
      });
  });

  it(`should't add a bus(missing bus fare)`, function (done) {
    let req = {
      body: {
        name: 'Chandigarh-Delhi Punjab Roadways',
        bus_no: 'PB01-123456',
        src: 'Punjab',
        dest: 'Delhi',
        src_time: new Date(2021, 1, 31, 10, 30, 0, 0),
        dest_time: new Date(2021, 1, 31, 13, 30, 0, 0),
      },
    };
    addBus(req, res, next)
      .then(function () {
        assert.ok(res.statusCode === 201);
        assert.ok(res.body.created === true);
        done(new Error('New Bus is created somehow?!'));
      })
      .catch(function (err) {
        done();
      });
  });

  it(`should remove the bus tickets`, function (done) {
    let req = {
      params: { busId: '600fbeafe8a96b4de46797b0' },
    };
    resetBus(req, res, next)
      .then(function () {
        assert.ok(res.statusCode === 200);
        assert.ok(res.body.removed == true);
        done();
      })
      .catch(function (err) {
        done(new Error(`Maybe couldn't remove valid bus tickets?!`));
      });
  });

  it(`shouldn't remove the bus tickets(invalid bus id)`, function (done) {
    let req = {
      params: { busId: 'aight imma head out' },
    };
    resetBus(req, res, next)
      .then(function () {
        assert.ok(res.statusCode === 200);
        assert.ok(res.body.removed == true);
        done(new Error(`Removed tickets from invalid bus?!`));
      })
      .catch(function (err) {
        done();
      });
  });
});
