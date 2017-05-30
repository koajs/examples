'use strict';

const Readable = require('stream').Readable;
const co = require('co');

module.exports = class View extends Readable {

  constructor(context) {
    super();

    // render the view on a different loop
    co.call(this, this.render).catch(context.onerror);
  }

  _read() {}

  *render() {
    // push the <head> immediately
    this.push('<!DOCTYPE html><html><head><title>Hello World</title></head>');

    // render the <body> on the next tick
    const body = yield done => {
      setImmediate(() => done(null, '<p>Hello World</p>'));
    };

    this.push('<body>' + body + '</body>');

    // close the document
    this.push('</html>');

    // end the stream
    this.push(null);
  };
};
