
var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('404', function(){
  describe('when GET /', function(){
    it('should return the 404 page', function(done){
      request
      .get('/')
      .expect(404)
      .expect(/Page Not Found/, done);
    })
  })
  describe('when GET /exception', function(){
    it('should return the 404 page', function(done){
      request
      .get('/exception')
      .expect(404)
      .expect(/Page Not Found/, done);
    })
  })
  describe('when GET /ok', function(){
    it('should 200 with "ok" message', function(done){
      request
      .get('/ok')
      .expect(200)
      .expect(/ok/, done);
  	})
  })
})