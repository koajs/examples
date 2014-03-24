
var koa = require('koa');
var onFinished = require('finished');
var fs = require('fs');
var app = module.exports = koa();
var path = require('path');
var extname = path.extname;

// try GET /app.js

app.use(function *(){
  var path = __dirname + this.path;
  this.type = extname(path);
  var stream = this.body = fs.createReadStream(path);
  // avoid any possible fd leak
  onFinished(this, stream.destroy.bind(stream));
});

if (!module.parent) app.listen(3000);
