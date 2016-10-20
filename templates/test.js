var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Templates', function() {
  describe('GET /', function() {
    it('should respond with a rendered view', function(done) {
      request
      .get('/')
      .expect(200)
      .expect('<p>Tobi is a 3 year old ferret.</p>', done);
    });
  });
});
