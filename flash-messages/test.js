const app = require('./app');
const request = require('supertest').agent(app.listen());

describe('Flash Messages', () => {
  it('GET should return an empty array', done => {
    request
      .get('/messages')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .expect('[]', done);
  });

  it('POST should return 204', done => {
    request
      .post('/messages')
      .send('hello')
      .expect(204, done);
  });

  it('GET should return the message', done => {
    request
      .get('/messages')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .expect('["hello"]', done);
  });

  it('GET should return no more messages', done => {
    request
      .get('/messages')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .expect('[]', done);
  });
});
