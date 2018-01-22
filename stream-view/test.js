require('should');
const app = require('./app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('Stream View', function() {
  after(function() {
    server.close();
  });

  it('GET /', function(done) {
    request
    .get('/')
    .expect(200, function(err, res) {
      if (err) return done(err);

      res.should.be.html;
      res.text.should.include('<title>Hello World</title>');
      res.text.should.include('<p>Hello World</p>');
      done();
    });
  });
});
