var logger = require('koa-logger');
var koa = require('koa');
var app = koa();

// passing any middleware to this middleware
// will make it conditional, and will not be used
// when an asset is requested, illustrating how
// middleware may "wrap" other middleware.

function ignoreAssets(mw) {
  return function *(next) {
    if (/(\.js|\.css|\.ico)$/.test(this.path)) {
      yield next;
    } else {
      // must .call() to explicitly set the receiver
      // so that "this" remains the koa Context
      yield mw.call(this, next);
    }
  };
}

// TRY:
// $ curl http://localhost:3000/
// $ curl http://localhost:3000/style.css
// $ curl http://localhost:3000/some.html

app.use(ignoreAssets(logger()));

app.use(function *() {
  this.body = 'Hello World';
});

app.listen(3000);
