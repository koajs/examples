var stylus = require('koa-stylus');
var serve = require('koa-static');
var koa = require('koa');
var app = module.exports = koa();

// Compile ./public/*.css from ./public/*.styl
app.use(stylus('./public'));

// Set the path to ./public
app.use(serve('./public'));

// You can access http://localhost:3000/stylesheets/style.css
// and ./public/stylesheets/style.css will be generated
app.listen(3000);
