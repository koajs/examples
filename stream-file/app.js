var koa = require('koa');
var fs = require('fs');
var app = module.exports = koa();
var path = require('path');
var extname = path.extname;

// try GET /app.js

app.use(function *() {
  var fpath = path.join(__dirname, this.path);
  var fstat = yield stat(fpath);

  if (fstat.isFile()) {
    this.type = extname(fpath);
    this.body = fs.createReadStream(fpath);
  }
});

if (!module.parent) app.listen(3000);

/**
 * thunkify stat
 */

function stat(file) {
  return function(done) {
    fs.stat(file, done);
  };
}
