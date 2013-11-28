var os = require('os');
var path = require('path');
var fs = require('fs');
var koa = require('koa');
var parse = require('co-busboy');
var saveTo = require('save-to');
var archan = require('archan');

var app = module.exports = koa();

app.use(function *(){
  var ch = archan();
  var parts = parse(this, {
    autoFields: true
  });

  // create a temporary folder to store files
  var tmpdir = path.join(os.tmpdir(), Math.random().toString(36).slice(2));
  // make the directory
  yield function (done) {
    fs.mkdir(tmpdir, done);
  }

  var part;
  while (part = yield parts) {
    // save each part to a file,
    // but do it in a different channel
    // so we don't block
    saveTo(part, path.join(tmpdir, part.filename), ch.push());
  }

  // create an array of files
  var files = [];
  var file;
  while (file = yield* ch.shift()) {
    files.push(file)
  }

  // return the files
  this.body = files;
})

if (!module.parent) app.listen(3000);