const app = require('./app');
const request = require('supertest').agent(app.listen());

describe('Hello World', () => {
  it('should say "Hello World"', done => {
    request
      .get('/')
      .expect(200)
      .expect('Hello World', done);
  });
});
