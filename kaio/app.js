


var koa = require('koa');
var kaio = require('kaio');

var app = module.exports = koa();

app.use(kaio()
  .setRoot(__dirname)
  .setHost('127.0.0.1')
  .setUri('/api')
  .bind('/', 'base-router')
  .bind('/books', 'books-router')
  .middleware());

if (!module.parent) app.listen(3000);
