
var koa = require('koa');
var PassThrough = require('stream').PassThrough;

/**
 * Simply streams "hello world" to the client through a stream.
 */

var app = module.exports = koa();

app.use(function *(){
  this.type = 'text';

  var stream = this.body = new PassThrough();

  // handle any errors
  stream.on('error', this.onerror);

  setTimeout(function(){
    stream.write('hello ');
  }, 1);

  setTimeout(function(){
    stream.write('world');
  }, 2);

  setTimeout(function(){
    stream.end();
  }, 3);
})

if (!module.parent) app.listen(3000);