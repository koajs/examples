var app = require('./app');
var request = require('supertest').agent(app.listen());

describe('Body Parsing', function(){
  describe('/json', function(){
    describe('when POSTing JSON', function(){
      it('should return a JSON body', function(done){
        request
        .post('/json')
        .send({
          message: 'hello'
        })
        .expect(200)
        .expect(/"message": "hello"/, done);
      })
    })

    describe('when POSTing urlencoded', function(){
      it('should 415', function(done){
        request
        .post('/json')
        .send('message=hello')
        .expect(415, done);
      })
    })

    describe('when POSTing a JSON primitive', function(){
      it('should 400', function(done){
        request
        .post('/json')
        .send(JSON.stringify(null))
        .set('Content-Type', 'application/json')
        .expect(400, done);
      })
    })

    describe('when POSTing with length > limit', function(){
      it('should 413', function(done){
        request
        .post('/json')
        .send({
          some_really_long_string: Math.random()
        })
        .expect(413, done);
      })
    })

    describe('when POSTing an empty body', function(){
      it('should 411', function(done){
        request
        .post('/json')
        .expect(411, done);
      })
    })
  })

  describe('/urlencoded', function(){
    describe('when POSTing urlencoded', function(){
      it('should return a JSON body', function(done){
        request
        .post('/urlencoded')
        .send('message=hello')
        .expect(200)
        .expect(/"message": "hello"/, done);
      })
    })

    describe('when POSTing JSON', function(){
      it('should 415', function(done){
        request
        .post('/urlencoded')
        .send({
          message: 'hello'
        })
        .expect(415, done);
      })
    })

    describe('when POSTing with length > limit', function(){
      it('should 413', function(done){
        request
        .post('/urlencoded')
        .send('some_really_long_string=' + Math.random())
        .expect(413, done);
      })
    })

    describe('when POSTing an empty body', function(){
      it('should 411', function(done){
        request
        .post('/urlencoded')
        .expect(411, done);
      })
    })
  })
})