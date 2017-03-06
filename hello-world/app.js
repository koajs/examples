const Koa = require('koa');
const app = module.exports = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

if (!module.parent) app.listen(3000);
