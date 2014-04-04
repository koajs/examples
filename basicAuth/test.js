var basicAuth = require('koa-basic-auth');
var request = require('supertest');
var koa = require('koa');
var assert = require('assert');

describe('Koa Basic Auth', function(){

  describe('with no credentials', function(){
    it('should `throw` 401', function(done){
      var app = koa();

      app.use(basicAuth({ name: 'user', pass: 'pass' }));

      request(app.listen())
        .get('/')
        .expect(401)
        .end(done);
    })
  })

  describe('with invalid credentials', function(){
    it('should `throw` 401', function(done){
      var app = koa();

      app.use(basicAuth({ name: 'user', pass: 'pass' }));

      request(app.listen())
        .get('/')
        .auth('foo', 'bar')
        .expect(401)
        .end(done);
    })
  })

  describe('with valid credentials', function(){
    it('should call the next middleware', function(done){
      var app = koa();

      app.use(basicAuth({ name: 'user', pass: 'pass' }));
      app.use(function *(){
        this.body = 'Protected';
      })

      request(app.listen())
        .get('/')
        .auth('user', 'pass')
        .expect(200)
        .expect('Protected')
        .end(done);
    })
  })
})