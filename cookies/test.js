var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Cookies Views', function() {
  [1, 2, 3].forEach(function(i) {
    describe('on iteration #' + i, function() {
      it('should set the views as a cookie and as the body', function(done) {
        request
        .get('/')
        .expect(200)
        .expect('Set-Cookie', new RegExp('view=' + i))
        .expect(i + ' views', done);
      });
    });
  });
});
