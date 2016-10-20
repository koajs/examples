var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Compose', function() {
  describe('when GET /', function() {
    it('should say "Hello World"', function(done) {
      request
      .get('/')
      .expect(200)
      .expect('Hello World', done);
    });

    it('should set X-Response-Time', function(done) {
      request
      .get('/')
      .expect('X-Response-Time', /ms$/)
      .expect(200, done);
    });
  });

  describe('when not GET /', function() {
    it('should 404', function(done) {
      request
      .get('/aklsjdf')
      .expect(404, done);
    });
  });
});
