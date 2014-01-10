var Readable = require('stream').Readable;
var inherits = require('util').inherits;
var co = require('co');

module.exports = View

inherits(View, Readable);

function View(context) {
  Readable.call(this, {});

  // render the view on a different loop
  co(this.render).call(this, context.onerror);
}

View.prototype._read = function () {};

View.prototype.render = function* () {
  // push the <head> immediately
  this.push('<!DOCTYPE html><html><head><title>Hello World</title></head>');

  // render the <body> on the next tick
  var body = yield function (done) {
    setImmediate(function () {
      done(null, '<p>Hello World</p>');
    });
  };
  this.push('<body>' + body + '</body>');

  // close the document
  this.push('</html>');
  // end the stream
  this.push(null);
};