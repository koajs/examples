/**
 * Multipart example downloading all the files to disk using co-busboy.
 * If all you want is to download the files to a temporary folder,
 * just use https://github.com/cojs/multipart instead of copying this code
 * as it handles file descriptor limits whereas this does not.
 */

var os = require('os');
var path = require('path');
var koa = require('koa');
var fs = require('co-fs');
var parse = require('co-busboy');
var saveTo = require('save-to');

var app = module.exports = koa();

app.use(function *() {
  // parse the multipart body
  var parts = parse(this, {
    autoFields: true // saves the fields to parts.field(s)
  });

  // create a temporary folder to store files
  var tmpdir = path.join(os.tmpdir(), uid());

  // make the temporary directory
  yield fs.mkdir(tmpdir);

  // list of all the files
  var files = [];
  var file;

  // yield each part as a stream
  var part;
  while ((part = yield parts)) {
    // filename for this part
    files.push(file = path.join(tmpdir, part.filename));
    // save the file
    yield saveTo(part, file);
  }

  // return all the filenames as an array
  // after all the files have finished downloading
  this.body = files;
});

if (!module.parent) app.listen(3000);

function uid() {
  return Math.random().toString(36).slice(2);
}
