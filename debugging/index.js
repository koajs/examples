
/**
 * Module dependencies.
 */

var koa = require('koa');
var app = koa();

// to enable debugging output per middleware
// run with the following environment variable:
// $ DEBUG=koa-compose node --harmony debugging

// note how the function names are used
// in the debug output.

app.use(function *json(next){
  yield next;
  this.body = { message: this.body };
});

app.use(function *reverse(next){
  yield next;
  this.set('X-Bar', 'baz');
  this.body = this.body.split('').reverse().join('');
});

app.use(function *uppercase(next){
  yield next;
  this.set('X-Foo', 'bar');
  this.body = this.body.toUpperCase();
});

app.use(function *response(next){
  this.body = 'Hello World'
});

app.listen(3000);