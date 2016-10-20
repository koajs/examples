var path = require('path');
var views = require('co-views');
var koa = require('koa');
var app = module.exports = koa();

// setup views, appending .ejs
// when no extname is given to render()

var render = views(path.join(__dirname, '/views'), { ext: 'ejs' });

// dummy data

var user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

// render

app.use(function *() {
  this.body = yield render('user', { user: user });
});

if (!module.parent) app.listen(4000);
