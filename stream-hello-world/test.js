var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Stream Hello World', function(){
  it('GET /', function(done){
    request
    .get('/')
    .expect(200)
    .expect('hello world', done);
  });
});