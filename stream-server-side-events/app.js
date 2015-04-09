var koa = require('koa');
var app = module.exports = koa();

var sse = require('./sse');
var db = require('./db');

app.use(function* () {
  // otherwise node will automatically close this connection in 2 minutes
  this.req.setTimeout(Number.MAX_VALUE);

  this.type = 'text/event-stream; charset=utf-8';
  this.set('Cache-Control', 'no-cache');
  this.set('Connection', 'keep-alive');

  var body = this.body = sse();
  var stream = db.subscribe('some event');
  stream.pipe(body);

  // if the connection closes or errors,
  // we stop the SSE.
  var socket = this.socket;
  socket.on('error', close);
  socket.on('close', close);

  function close() {
    stream.unpipe(body);
    socket.removeListener('error', close);
    socket.removeListener('close', close);
  }
});

if (!module.parent) app.listen(3000);
