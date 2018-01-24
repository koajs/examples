const app = require('./app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('Compose', function() {
  after(function() {
    server.close();
  });

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
