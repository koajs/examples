var app = require('./app')
var request = require('supertest').agent(app.listen());

describe('Hello Word', function(){
  it('should say "Hello Word"', function(done){
    request
    .get('/')
    .expect(200)
    .expect('Hello World', done);
  })
})