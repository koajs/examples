// rather than koa apps we can also use array
// bundles of middleware to the same effect.

function *responseTime(next) {
  var start = new Date();
  yield next;
  var ms = new Date() - start;
  this.set('X-Response-Time', ms + 'ms');
}

function *index(next) {
  yield next;
  if ('/' != this.url) return;
  this.body = 'Howzit? From bar middleware bundle';
}

module.exports = [
  responseTime,
  index
];
