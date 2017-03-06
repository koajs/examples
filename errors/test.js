const app = require('./app');
const request = require('supertest').agent(app.listen());

describe('Errors', () => {
  it('should catch the error', done => {
    request
      .get('/')
      .expect(500)
      .expect('Content-Type', /text\/html/);
    done();
  });

  it('should emit the error on app', done => {
    app.once('error', (err, ctx) => {
      err.message.should.equal('boom boom');
      ctx.should.be.ok;
      done();
    });
    request
      .get('/')
      .end(() => {});
  });
});
