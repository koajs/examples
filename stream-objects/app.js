
var koa = require('koa');
var JSONStream = require('streaming-json-stringify');

var app = module.exports = koa();

app.use(function *() {
  this.type = 'json';
  var stream = this.body = JSONStream();

  stream.on('error', this.onerror);

  setImmediate(function() {
    stream.write({
      id: 1
    });

    setImmediate(function() {
      stream.write({
        id: 2
      });

      setImmediate(function() {
        stream.end();
      });
    });
  });
});

if (!module.parent) app.listen(3000);
