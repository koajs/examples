const Koa = require('koa');
const app = module.exports = new Koa();

app.use(async function pageNotFound(ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) ctx.throw(404);
  } catch (err) {
    if (err.status !== 404) return;
    switch (ctx.accepts('html', 'json')) {
      case 'html':
        ctx.type = 'html';
        ctx.body = '<p>Page Not Found</p>';
        break;
      case 'json':
        ctx.type = 'json';
        ctx.body = {
          message: 'Page Not Found'
        };
        break;
      default:
        ctx.type = 'text';
        ctx.body = 'Page Not Found';
    }
  }
});

if (!module.parent) app.listen(3000);
