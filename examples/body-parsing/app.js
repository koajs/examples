var koa = require('koa');
var qs = require('querystring');
var rawBody = require('raw-body');

var app = module.exports = koa();

// only json requests
app.use(function *(next){
  if (this.path !== '/json') return yield next;
  if (this.length == 0) this.throw(400, 'no request body');
  if (this.length == null) this.throw(411, 'content length required');
  if (!this.is('application/json')) this.throw(415, 'json bodies only');

  var body = yield rawBody(this.req, {
    length: this.length,
    limit: 25, // bytes
    encoding: 'utf8'
  });

  body = body.trim();
  if (body[0] != '{') this.throw(400, 'request body must be a JSON object');

  try {
    return this.body = JSON.parse(body);
  } catch (err) {
    err.status = 400;
    throw err;
  }
})

// only urlencoded requests
app.use(function *(next){
  if (this.path !== '/urlencoded') return yield next;
  if (this.length == 0) this.throw(400, 'no request body');
  if (this.length == null) this.throw(411, 'content length required');
  if (!this.is('application/x-www-form-urlencoded')) this.throw(415, 'urlencoded bodies only');

  var body = yield rawBody(this.req, {
    length: this.length,
    limit: 25, // bytes
    encoding: 'utf8'
  });

  try {
    return this.body = qs.parse(body);
  } catch (err) {
    err.status = 400;
    throw err;
  }
})

if (!module.parent) app.listen(3000);