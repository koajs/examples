
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const app = module.exports = new Koa();

app.use(bodyParser({'jsonLimit': '1kb'}));

// POST .name to /uppercase
// co-body accepts application/json
// and application/x-www-form-urlencoded

app.use(async (ctx, next) => {
  if (ctx.method !== 'POST') await next();
  const body = ctx.request.body;
  if (!body.name) ctx.throw(400, '.name required');
  ctx.body = { name: body.name.toUpperCase() };
});

if (!module.parent) app.listen(3000);
