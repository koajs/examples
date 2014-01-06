var koa = require('koa');
var STATUS_CODES = require('http').STATUS_CODES;

var app = module.exports = koa();

app.use(function *pageNotFound(next){
  yield next;
  // already handled
  if (this.status) return;

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
      break
    default:
      this.type = 'text';
      this.body = 'Page Not Found';
  }
})

Object.keys(STATUS_CODES).forEach(function(code){
  app.use(function *(next){
    if (this.path !== '/' + code) return yield next;
    this.status = parseInt(code);
    this.body = STATUS_CODES[code];
  })
})

if (!module.parent) app.listen(3000);