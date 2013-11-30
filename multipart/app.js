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
  var ch = archan({
    concurrency: 1 // save only 1 file at a time
  });

  // parse the multipart body
  var parts = parse(this, {
    autoFields: true // saves the fields to parts.field(s)
  });

  // create a temporary folder to store files
  var tmpdir = path.join(os.tmpdir(), Math.random().toString(36).slice(2));

  // make the temporary directory
  yield fs.mkdir.bind(null, tmpdir);

  // yield each part as a stream
  var part;
  while (part = yield parts) {
    // wait if there are too many file descriptors opened
    yield* ch.drain();
    // save each part to a file,
    // but do it in a different channel
    // so we don't block this particular while loop.
    saveTo(part, path.join(tmpdir, part.filename), ch.push());
  }

  // return all the filenames as an array
  // after all the files have finished downloading
  this.body = yield* ch.flush();
})

if (!module.parent) app.listen(3000);