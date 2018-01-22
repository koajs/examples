require('should');
const app = require('./app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('Stream Objects', function() {
  after(function() {
    server.close();
  });

  it('GET /', function(done) {
    request
    .get('/app.js')
    .expect(200, function(err, res) {
      if (err) return done(err);

      res.body.should.eql([{
        id: 1
      }, {
        id: 2
      }]);
      done();
    });
  });
});
