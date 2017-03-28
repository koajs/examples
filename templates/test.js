const app = require('./app');
const request = require('supertest').agent(app.listen());

describe('Templates', () => {
  describe('GET /', () => {
    it('should respond with a rendered view', done => {
      request
        .get('/')
        .expect(200)
        .expect('<p>Tobi is a 3 year old ferret.</p>', done);
    });
  });
});
