const Koa = require('koa');

// koa app

const app = new Koa();

app.use(async function(ctx, next) {
  await next();
  ctx.set('X-Custom', 'Dub Dub Dub App');
});

app.use(async function(ctx, next) {
  await next();
  if ('/' != ctx.url) return;
  ctx.body = 'Hello from www app';
});

module.exports = app;
