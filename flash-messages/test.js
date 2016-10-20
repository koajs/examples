var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Flash Messages', function() {
  it('GET should return an empty array', function(done) {
    request
    .get('/messages')
    .expect(200)
    .expect('content-type', 'application/json; charset=utf-8')
    .expect('[]', done);
  });

  it('POST should return 204', function(done) {
    request
    .post('/messages')
    .send('hello')
    .expect(204, done);
  });

  it('GET should return the message', function(done) {
    request
    .get('/messages')
    .expect(200)
    .expect('content-type', 'application/json; charset=utf-8')
    .expect('["hello"]', done);
  });

  it('GET should return no more messages', function(done) {
    request
    .get('/messages')
    .expect(200)
    .expect('content-type', 'application/json; charset=utf-8')
    .expect('[]', done);
  });
});
