const assert = require('assert');
const app = require('../app');
const request = require('supertest');

describe('Test for app.js', function () {
  it('should add testVal value to res and less than 10', function () {
    return request(app)
      .get('/test')
      .expect(200)
      .then((res) => {
        assert.ok(res.body.testVal < 10);
      });
  });
});
