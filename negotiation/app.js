
var koa = require('koa');
var app = module.exports = koa();

var tobi = {
  _id: '123',
  name: 'tobi',
  species: 'ferret'
};

var loki = {
  _id: '321',
  name: 'loki',
  species: 'ferret'
};

var users = {
  tobi: tobi,
  loki: loki
};

// content negotiation middleware.
// note that you should always check for
// presence of a body, and sometimes you
// may want to check the type, as it may
// be a stream, buffer, string, etc.

app.use(function *(next) {
  yield next;

  // no body? nothing to format, early return
  if (!this.body) return;

  // Check which type is best match by giving
  // a list of acceptable types to `req.accepts()`.
  var type = this.accepts('json', 'html', 'xml', 'text');

  // not acceptable
  if (type === false) this.throw(406);

  // accepts json, koa handles this for us,
  // so just return
  if (type === 'json') return;

  // accepts xml
  if (type === 'xml') {
    this.type = 'xml';
    this.body = '<name>' + this.body.name + '</name>';
    return;
  }

  // accepts html
  if (type === 'html') {
    this.type = 'html';
    this.body = '<h1>' + this.body.name + '</h1>';
    return;
  }

  // default to text
  this.type = 'text';
  this.body = this.body.name;
});

// filter responses, in this case remove ._id
// since it's private

app.use(function *(next) {
  yield next;

  if (!this.body) return;

  delete this.body._id;
});

// try $ GET /tobi
// try $ GET /loki

app.use(function *() {
  var name = this.path.slice(1);
  var user = users[name];
  this.body = user;
});

if (!module.parent) app.listen(3000);

