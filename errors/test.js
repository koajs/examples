require('should');
const app = require('./app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('Errors', function() {
  after(function() {
    server.close();
  });

  it('should catch the error', function(done) {
    request
    .get('/')
    .expect(500)
    .expect('Content-Type', /text\/html/, done);
  });

  it('should emit the error on app', function(done) {
    app.once('error', function(err, ctx) {
      err.message.should.equal('boom boom');
      ctx.should.be.ok;
      done();
    });

    request
    .get('/')
    .end(function() {});
  });
});
