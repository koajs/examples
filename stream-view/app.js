const Koa = require('koa');

const View = require('./view');

const app = module.exports = new Koa();

app.use(async function(ctx) {
  ctx.type = 'html';
  ctx.body = new View(ctx);
});

if (!module.parent) app.listen(3000);
