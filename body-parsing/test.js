var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Body Parsing', function(){
  describe('POST /uppercase', function(){
    describe('with JSON', function(){
      it('should work', function(done){
        request
        .post('/uppercase')
        .send({ name: 'tobi' })
        .expect(200)
        .expect({ name: 'TOBI' }, done);
      })
    })

    describe('with urlencoded', function(){
      it('should work', function(done){
        request
        .post('/uppercase')
        .send('name=tj')
        .expect(200)
        .expect({ name: 'TJ' }, done);
      })
    })


    describe('when length > limit', function(){
      it('should 413', function(done){
        request
        .post('/json')
        .send({ name: Array(5000).join('a') })
        .expect(413, done);
      })
    })
  })
})