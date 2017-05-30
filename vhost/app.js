const compose = require('koa-compose');
const Koa = require('koa');
const app = module.exports = new Koa();

// virtual host apps

const wwwSubdomain = composer(require('./apps/koa'));
const barSubdomain = composer(require('./apps/array'));

// compose koa apps and middleware arrays
// to be used later in our host switch generator

function composer(app) {
  const middleware = app instanceof Koa ? app.middleware : app;
  return compose(middleware);
}

// look ma, global response logging for all our apps!

app.use(async function(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  if ('test' != process.env.NODE_ENV) {
    console.log('%s %s %s - %sms', ctx.host, ctx.method, ctx.url, ms);
  }
});

// switch between appropriate hosts calling their
// composed middleware with the appropriate context.

app.use(async function(ctx, next) {
  switch (ctx.hostname) {
    case 'example.com':
    case 'www.example.com':
      // displays `Hello from main app`
      // and sets a `X-Custom` response header
      return await wwwSubdomain.apply(this, [ctx, next]);
    case 'bar.example.com':
      // displays `Howzit? From bar middleware bundle`
      // and sets a `X-Response-Time` response header
      return await barSubdomain.apply(this, [ctx, next]);
  }

  // everything else, eg: 127.0.0.1:3000
  // will propagate to 404 Not Found
  return await next();
});

if (!module.parent) app.listen(3000);
