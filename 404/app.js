var koa = require('koa');

var app = module.exports = koa();

app.use(function *pageNotFound(next){
  yield next;

  if (404 != this.status) return;

  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  this.status = 404;

  switch (this.accepts('html', 'json')) {
    case 'html':
      this.type = 'html';
      this.body = '<p>Page Not Found</p>';
      break;
    case 'json':
      this.body = {
        message: 'Page Not Found'
      };
      break;
    default:
      this.type = 'text';
      this.body = 'Page Not Found';
  }
})

app.use(function *exception(next){
  if (this.url != '/exception') {
    return yield next;
  }

  this.assert(false, 404);
})

app.use(function *ok(next){
  if (this.url != '/ok') {
    return yield next;
  }

  this.body = 'ok';
})

if (!module.parent) app.listen(3000);
