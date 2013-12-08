
var koa = require('koa');
var fs = require('fs');
var app = module.exports = koa();
var path = require('path');
var extname = path.extname;

// try GET /app.js

app.use(function *(){
  var path = __dirname + this.path;
  this.type = extname(path);
  this.body = fs.createReadStream(path);
});

if (!module.parent) app.listen(3000);
