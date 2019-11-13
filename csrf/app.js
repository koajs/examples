const Koa = require('koa');
const koaBody = require('koa-body');
const session = require('koa-session');
const CSRF = require('koa-csrf');
const router = require('koa-router')();
const Keygrip = require('keygrip');

const app = module.exports = new Koa();

/**
 * csrf need session
 */

app.keys = new Keygrip(['insert 64 bytes random string', 'insert another 64 bytes random string'], 'sha512');
app.use(session(app));
app.use(koaBody());

/**
 * maybe a bodyparser
 */

/**
 * csrf middleware
 */

app.use(new CSRF());

/**
 * route
 */

router.get('/token', token)
  .post('/post', post);

app.use(router.routes());

async function token(ctx) {
  ctx.body = ctx.csrf;
}

async function post(ctx) {
  ctx.body = {ok: true};
}

if (!module.parent) app.listen(3000);
