const app = require('./app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('Virtual Host', function() {
  after(function() {
    server.close();
  });

  describe('www subdomain koa app', function() {
    describe('when GET /', function() {
      it('should say "Hello from www app"', function(done) {
        request
        .get('/')
        .set('Host', 'www.example.com')
        .expect(200)
        .expect('Hello from www app', done);
      });

      it('should set X-Custom', function(done) {
        request
        .get('/')
        .set('Host', 'www.example.com')
        .expect('X-Custom', 'Dub Dub Dub App')
        .expect(200, done);
      });
    });

    describe('when GET / without subdomain', function() {
      it('should say "Hello from www app"', function(done) {
        request
          .get('/')
          .set('Host', 'example.com')
          .expect(200)
          .expect('Hello from www app', done);
      });

      it('should set X-Custom', function(done) {
        request
          .get('/')
          .set('Host', 'example.com')
          .expect('X-Custom', 'Dub Dub Dub App')
          .expect(200, done);
      });
    });

    describe('when not GET /', function() {
      it('should 404', function(done) {
        request
        .get('/aklsjdf')
        .set('Host', 'example.com')
        .expect(404, done);
      });
    });
  });
  describe('bar subdomain array bundle', function() {
    describe('when GET /', function() {
      it('should say "Howzit? From bar middleware bundle"', function(done) {
        request
        .get('/')
        .set('Host', 'bar.example.com')
        .expect(200)
        .expect('Howzit? From bar middleware bundle', done);
      });

      it('should set X-Response-Time', function(done) {
        request
        .get('/')
        .set('Host', 'bar.example.com')
        .expect('X-Response-Time', /ms$/)
        .expect(200, done);
      });
    });

    describe('when not GET /', function() {
      it('should 404', function(done) {
        request
        .get('/aklsjdf')
        .set('Host', 'bar.example.com')
        .expect(404, done);
      });
    });
  });
  describe('default vhost', function() {
    describe('when GET /', function() {
      it('should 404', function(done) {
        request
        .get('/')
        .set('Host', '127.0.0.1')
        .expect(404, done);
      });
    });
  });
});
