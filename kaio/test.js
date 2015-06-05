


var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Kaio App', function(){
  it('GET / should return 404', function(done){
    request
    .get('/')
    .expect(404, done);
  });

  it('GET /api should return 200', function(done){
    request
    .get('/api')
    .expect(200, done);
  });

  it('GET /api/books should return 200', function(done){
    request
    .get('/api/books')
    .expect(200, done);
  });

  it('GET /api/books/The%2520Two%2520Towers should return 200', function(done){
    request
    .get('/api/books/The%2520Two%2520Towers')
    .expect(200, done);
  });

  it('GET /api/books/The%2520Three%2520Towers should return 204', function(done){
    request
    .get('/api/books/The%2520Three%2520Towers')
    .expect(204, done);
  });
});
