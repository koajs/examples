var compose = require('koa-compose');
var koa = require('koa');
var app = module.exports = koa();

// virtual host apps

var wwwSubdomain = composer(require('./apps/koa'));
var barSubdomain = composer(require('./apps/array'));

// compose koa apps and middleware arrays
// to be used later in our host switch generator

function composer(app) {
  var middleware = app instanceof koa ? app.middleware : app;
  return compose(middleware);
}

// look ma, global response logging for all our apps!

app.use(function *(next) {
  var start = new Date();
  yield next;
  var ms = new Date() - start;
  if ('test' != process.env.NODE_ENV) {
    console.log('%s %s %s - %sms', this.host, this.method, this.url, ms);
  }
});

// switch between appropriate hosts calling their
// composed middleware with the appropriate context.

app.use(function *(next) {
  switch (this.hostname) {
    case 'example.com':
    case 'www.example.com':
      // displays `Hello from main app`
      // and sets a `X-Custom` response header
      return yield wwwSubdomain.call(this, next);
    case 'bar.example.com':
      // displays `Howzit? From bar middleware bundle`
      // and sets a `X-Response-Time` response header
      return yield barSubdomain.call(this, next);
  }

  // everything else, eg: 127.0.0.1:3000
  // will propagate to 404 Not Found
  return yield next;
});

if (!module.parent) app.listen(3000);
