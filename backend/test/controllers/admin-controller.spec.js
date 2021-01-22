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

describe('Test for controllers/admin-controller.js:', () => {
  let res;
  beforeEach('req and res should be some fresh objects', () => {
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

  it('should add a bus', () => {
    let req = {
      body: {
        name: 'Chandigarh-Delhi Punjab Roadways',
        bus_no: 'PB01-123456',
        src: 'ISBT Chandigarh',
        dest: 'ISBT Delhi',
        bus_time: new Date(2021, 1, 31, 10, 30, 0, 0),
      },
    };
    addBus(req, res, next).then((done) => {
      assert.ok(res.statusCode === 201);
      assert.ok(
        res.body.bus &&
          res.body.bus.id &&
          res.body.bus.name.length > 0 &&
          res.body.bus.bus_no.length > 0
      );
      done();
    });
  });

  it(`should remove the bus above`, () => {
    let req = {
      params: { busId: '600aba3ea7d67057b0843ac3' },
    };
    resetBus(req, res, next).then((done) => {
      assert.ok(res.statusCode === 200);
      assert.ok(res.body.removed);
      done();
    });
  });
});
