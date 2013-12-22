var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Stream File', function(){
  it('GET /app.js', function(done){
    request
    .get('/app.js')
    .expect(200, done);
  });

  it('GET /test.js', function(done){
    request
    .get('/test.js')
    .expect(200, done);
  });

  it('GET /alksjdf.js', function(done){
    request
    .get('/lajksdf.js')
    .expect(404, done);
  });
});