/**
 * Each `app.use()` only accepts a single generator function.
 * If you want to combine multiple generator functions into a single one,
 * you can use `koa-compose` to do so.
 * This allows you to use `app.use()` only once.
 * Your code will end up looking something like:
 *
 *   app.use(compose([
 *     function *(){},
 *     function *(){},
 *     function *(){}
 *   ]))
 *
 *
 * If you want to named composed middleware for debugging.
 * Your code will end up looking something like:
 *
 *  var fn = compose([
 *    function *(){},
 *    function *(){},
 *    function *(){}
 *  ])
 *
 *  app.use(function* all(next) {
 *    yield fn
 *    yield next
 *  })
 *
 *
 * Or set `_name` property:
 *
 *  fn._name = 'all'
 *  app.use(fn)
 *
 *
 * Or using `function-name` node module:
 *
 *  $ npm install function-name
 *
 *  var set = require('function-name')
 *  set(fn, 'all')
 */


var compose = require('koa-compose');
var koa = require('koa');
var app = module.exports = koa();

// x-response-time

function* responseTime(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
}

// logger

function* logger(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  if ('test' != process.env.NODE_ENV) {
    console.log('%s %s - %s', this.method, this.url, ms);
  }
}

// response

function* respond(next){
  yield next;
  if ('/' != this.url) return;
  this.body = all.name;
}

// composed middleware

var fn = compose([
  responseTime,
  logger,
  respond
]);

function* all(next) {
  yield fn;
  yield next;
}

app.use(all);

// status

function* status(next) {
  if ('/status' === this.url) {
    yield next;
  }
}

function* statusRespond(next) {
  this.body = fn2._name;
}

// composed middleware

var fn2 = compose([
  status,
  statusRespond
]);

fn2._name = 'status'

app.use(fn2);

if (!module.parent) app.listen(3000);
