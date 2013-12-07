
var koa = require('koa');
var fs = require('fs');
var app = module.exports = koa();

// try GET /app.js

app.use(function *(){
  var path = __dirname + this.path;
  if (yield exists(path)) this.body = fs.createReadStream(path).on('error', this.onerror);
});

function exists(file) {
  return function(done){
    fs.stat(file, done);
  }
}

if (!module.parent) app.listen(3000);
