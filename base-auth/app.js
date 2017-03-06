const auth = require('koa-basic-auth');
const Koa = require('koa');
const app = module.exports = new Koa();

// custom 401 handling

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'cant haz that';
    } else {
      throw err;
    }
  }
});

// require auth

app.use(auth({ name: 'tj', pass: 'tobi' }));

// secret response

app.use(async ctx => {
  ctx.body = 'secret';
});

if (!module.parent) app.listen(3000);
