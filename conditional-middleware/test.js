var app = require('./index');
var request = require('supertest').agent(app.listen());

function hasCalledMiddleWare(res) {
  if (!('x-response-time' in res.headers)) throw new Error("did not call middleware");
}

function hasNotCalledMiddleware(res) {
  if (('x-response-time' in res.headers)) throw new Error('called middleware');
}

describe('Conditional Middleware', function() {
  describe('when GET /', function() {
    it('calls middleware', function(done) {
      request
        .get('/')
        .expect(hasCalledMiddleWare)
        .expect('X-Response-Time', /ms$/)
        .expect(/Hello World/)
        .expect(200, done);
    });
  });

  describe('when GET /style.css', function() {
    it('ignores middleware', function(done) {
      request
        .get('/style.css')
        .expect(hasNotCalledMiddleware)
        .expect(/Hello World/)
        .expect(200, done);
    })
  });

  describe('when GET /some.html', function() {
    it('calls middleware', function(done) {
      request
        .get('/')
        .expect(hasCalledMiddleWare)
        .expect('X-Response-Time', /ms$/)
        .expect(/Hello World/)
        .expect(200, done);
    });
  });
});
