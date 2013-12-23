var fs = require('fs');
var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('CSS file check', function(){
  it('GET /stylesheets/style.css', function(done){
    // Delete the CSS file at first
    fs.unlink('./public/stylesheets/style.css', function(){
      // GET /stylesheets/style.css
      request
      .get('/stylesheets/style.css')
      .expect(200, done);
    });
  });
});
