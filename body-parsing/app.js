
var koa = require('koa');
var parse = require('co-body');

var app = module.exports = koa();

// POST .name to /uppercase
// co-body accepts application/json
// and application/x-www-form-urlencoded

app.use(function *(next) {
  if ('POST' != this.method) return yield next;
  var body = yield parse(this, { limit: '1kb' });
  if (!body.name) this.throw(400, '.name required');
  this.body = { name: body.name.toUpperCase() };
});

if (!module.parent) app.listen(3000);
