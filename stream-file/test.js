const app = require('./app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('Stream File', function() {
  after(function() {
    server.close();
  });

  it('GET /app.js', function(done) {
    request
    .get('/app.js')
    .expect('content-type', /application\/javascript/)
    .expect(200, done);
  });

  it('GET /test.js', function(done) {
    request
    .get('/test.js')
    .expect('content-type', /application\/javascript/)
    .expect(200, done);
  });

  it('GET /alksjdf.js', function(done) {
    request
    .get('/lajksdf.js')
    .expect(404, done);
  });

  it('GET /', function(done) {
    request
    .get('/')
    .expect(404, done);
  });
});
