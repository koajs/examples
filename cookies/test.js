const app = require('./app');
const request = require('supertest').agent(app.listen());

describe('Cookies Views', () => {
  [1, 2, 3].forEach(i => {
    describe('on iteration #' + i, () => {
      it('should set the views as a cookie and as the body', done => {
        request
        .get('/')
        .expect(200)
        .expect('Set-Cookie', new RegExp('view=' + i))
        .expect(i + ' views', done);
      });
    });
  });
});
