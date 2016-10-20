/**
 * This example simply sets the number of views from the same client
 * both as a cookie and as a response string.
 */

var koa = require('koa');
var app = module.exports = koa();

app.use(function *() {
  var n = ~~this.cookies.get('view') + 1;
  this.cookies.set('view', n);
  this.body = n + ' views';
});

if (!module.parent) app.listen(3000);
