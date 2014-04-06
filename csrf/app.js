var koa = require('koa');
var parse = require('co-body');
var session = require('koa-session');
var csrf = require('koa-csrf');
var route = require('koa-route');

var app = module.exports = koa();

/**
 * csrf middleware
 */

csrf(app);

/**
 * csrf need session
 */
app.keys = ['session key', 'csrf example'];
app.use(session());

/**
 * assert CSRF token
 */

app.use(function* (next) {
  if (this.method === 'GET'
    || this.method === 'HEAD'
    || this.method === 'OPTIONS') {
    return yield* next;
  }

  // co-body or use other bodyparser middlewares
  var body = yield parse(this);
  try {
    this.assertCSRF(body);
  } catch (err) {
    this.status = 403;
    this.body = {
      message: 'This CSRF token is invalid!'
    };
    return;
  }
  yield* next;
});

/**
 * route
 */

app.use(route.get('/token', token));
app.use(route.post('/post', post));

function* token () {
  this.body = this.csrf;
}

function* post() {
  this.body = {ok: true};
}

if (!module.parent) app.listen(3000);
