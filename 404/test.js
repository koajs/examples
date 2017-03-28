const app = require('./app');
const request = require('supertest').agent(app.listen());

describe('404', () => {
  describe('when GET /', () => {
    it('should return the 404 page', done => {
      request
      .get('/')
      .expect(404)
      .expect(/Page Not Found/);
      done();
    });
  });
});
