const app = require('./app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('negotiation', function() {
  after(function() {
    server.close();
  });

  describe('json', function() {
    it('should respond with json', function(done) {
      request
      .get('/tobi')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({ name: 'tobi', species: 'ferret' }, done);
    });
  });

  describe('xml', function() {
    it('should respond with xml', function(done) {
      request
      .get('/tobi')
      .set('Accept', 'application/xml')
      .expect(200)
      .expect('Content-Type', /xml/)
      .expect('<name>tobi</name>', done);
    });
  });

  describe('html', function() {
    it('should respond with html', function(done) {
      request
      .get('/tobi')
      .set('Accept', 'text/html')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect('<h1>tobi</h1>', done);
    });
  });

  describe('text', function() {
    it('should respond with html', function(done) {
      request
      .get('/tobi')
      .set('Accept', 'text/plain')
      .expect(200)
      .expect('Content-Type', /plain/)
      .expect('tobi', done);
    });
  });

  describe('*/*', function() {
    it('should give precedence to the first accepted type', function(done) {
      request
      .get('/tobi')
      .set('Accept', '*/*')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('{"name":"tobi","species":"ferret"}', done);
    });
  });
});
