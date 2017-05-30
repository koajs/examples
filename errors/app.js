const Koa = require('koa');
const app = module.exports = new Koa();

// look ma, error propagation!

app.use(async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    // some errors will have .status
    // however this is not a guarantee
    ctx.status = err.status || 500;
    ctx.type = 'html';
    ctx.body = '<p>Something <em>exploded</em>, please contact Maru.</p>';

    // since we handled this manually we'll
    // want to delegate to the regular app
    // level error handling as well so that
    // centralized still functions correctly.
    ctx.app.emit('error', err, ctx);
  }
});

// response

app.use(async function() {
  throw new Error('boom boom');
});

// error handler

app.on('error', function(err) {
  if (process.env.NODE_ENV != 'test') {
    console.log('sent error %s to the cloud', err.message);
    console.log(err);
  }
});

if (!module.parent) app.listen(3000);
