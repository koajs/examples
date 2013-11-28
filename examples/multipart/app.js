var koa = require('koa');
var Busboy = require('co-busboy');

var app = module.exports = koa();

app.use(function *(next){
  if (this.method !== 'POST') return yield next;

  var parser = Busboy(this);
  var part
  while (part = yield parser.part()) {
    console.log('received file: ' + part.filename);
    // we just dump the stream,
    // but you may want to save it to a file or something.
    part.resume();
  }

  this.status = 204;
})

if (!module.parent) app.listen(3000);