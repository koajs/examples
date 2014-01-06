var app = require('./app');
var request = require('supertest').agent(app.listen());
var STATUS_CODES = require('http').STATUS_CODES;

describe('404', function(){
  describe('when GET /404', function(){
    it('should return the status message', function(done){
      request
      .get('/404')
      .expect(404)
      .expect(STATUS_CODES[404], done);
    })
  })

  describe('when GET /', function(){
    it('should return the 404 page', function(done){
      request
      .get('/')
      .expect(404)
      .expect(/Page Not Found/, done);
    })
  })
})