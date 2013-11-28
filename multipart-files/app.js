var os = require('os');
var path = require('path');
var fs = require('fs');
var koa = require('koa');
var parse = require('co-busboy');
var saveTo = require('save-to');
var archan = require('archan');

var app = module.exports = koa();

app.use(function *(){
  // create a go-like channel for control flow
  var ch = archan();

  // parse the multipart body
  var parts = parse(this, {
    autoFields: true
  });

  // create a temporary folder to store files
  var tmpdir = path.join(os.tmpdir(), Math.random().toString(36).slice(2));

  // make the directory
  yield fs.mkdir.bind(null, tmpdir);

  // yield each part as a stream
  var part;
  while (part = yield parts) {
    // save each part to a file,
    // but do it in a different channel
    // so we don't block this particular while loop.
    saveTo(part, path.join(tmpdir, part.filename), ch.push());
  }

  // return all the filenames as an array
  this.body = yield* ch.end();
})

if (!module.parent) app.listen(3000);