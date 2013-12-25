
var koa = require('koa');
var JSONStream = require('streaming-json-stringify');

var app = module.exports = koa();

app.use(function *(){
  this.type = 'json';
  var stream = this.body = JSONStream();

  stream.on('error', this.onerror);

  setTimeout(function(){
    stream.write({
      id: 1
    });
  }, 1);

  setTimeout(function(){
    stream.write({
      id: 2
    });
  }, 2);

  setTimeout(function(){
    stream.end();
  }, 3);
});

if (!module.parent) app.listen(3000);
