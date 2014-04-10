
/**
 * Module dependencies.
 */

var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var app = koa();

// Setup co-monk
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/koaBlog');

var posts = wrap(db.get('posts'));

// middleware

app.use(logger());

// route middleware

app.use(route.get('/', list));
app.use(route.get('/post/new', add));
app.use(route.get('/post/:id', show));
app.use(route.post('/post', create));
app.use(route.post('/post/:id', update));
app.use(route.get('/post/:id/edit', edit));
app.use(route.get('/post/:id/delete', remove));


// route definitions

/**
 * Post listing.
 */

function *list() {
  var postList = yield posts.find({});
  console.log(postList[0]);
  this.body = yield render('list', { posts: postList });
}

/**
 * Show creation form.
 */

function *add() {
  this.body = yield render('new');
}

/**
 * Show post :id.
 */

function *show(id) {
  var post = yield posts.findOne({_id:id});
  if (!post) this.throw(404, 'invalid post id');
  this.body = yield render('show', { post: post });
}

/**
 * Create a post.
 */

function *create() {
  var post = yield parse(this);
  post.created_at = new Date;

  yield posts.insert(post);
  this.redirect('/');
}

/**
 * Show edit form
 */
function *edit(id) {
  var post = yield posts.findOne({_id:id});
  this.body = yield render('edit', { post: post });
}

/**
 * Update post
 */
function *update(id) {
  var post = yield parse(this);
  yield posts.updateById(id, post);
  this.redirect('/post/' + id);
}

/**
 * Remove post
 */
function *remove(id) {
  yield posts.remove({_id:id});
  this.redirect('/');
}

// listen
app.listen(3000);
console.log('listening on port 3000');