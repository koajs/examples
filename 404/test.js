const app = require('./app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('404', function() {
  after(function() {
    server.close();
  });

  describe('when GET /', function() {
    it('should return the 404 page', function(done) {
      request
        .get('/')
        .expect(404)
        .expect(/Page Not Found/, done);
    });
  });
});
