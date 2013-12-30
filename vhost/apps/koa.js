var koa = require('koa');

// koa app

var app = koa();

app.use(function *(next) {
  yield next;
  this.set('X-Custom', 'Dub Dub Dub App');
});

app.use(function *(next) {
  yield next;
  if ('/' != this.url) return;
  this.body = 'Hello from www app';
});

module.exports = app;
