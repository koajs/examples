// Create the application
var koa = require('koa');
var route = require('koa-route');
var parse = require('co-body');
var app = module.exports = koa();

// Set up monk stuff, via co-monk
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/koa_users');
var users = wrap(db.get('users'));

// For testing, let's expose the users collection
module.exports.users = users;

// Set up some routes
app.use(route.post('/user', create));
app.use(route.get('/user', list));
app.use(route.get('/user/:id', getUser));
app.use(route.put('/user/:id', updateUser));
app.use(route.del('/user/:id', deleteUser));

// And here is route handling
// I haven't included error handling but trust the
// built in Koa default error handling
// (returns 500 and logs to console)
function *create() {
	var user = yield parse(this);
	user.created_on = new Date;

	var u = yield users.insert(user);
	this.body  = u;
	this.set("Location", "/user/" + user._id);
	this.status = 201;
};

function *list() {
	var res = yield users.find({});
  	this.body = res;
	this.status = 200;
};

function *getUser(id){
	var res = yield users.findOne({_id:id});
	this.body = res;
	this.status = 200;
};

function *updateUser(id){
	var user = yield parse(this);
	yield users.updateById(id, user);
	this.status = 204;
};

function *deleteUser(id){
	var res = yield users.remove({_id:id});
	var u = yield users.findOne({_id:id});
	console.log(u);
	this.status = 200;
};

// fire the app up
app.listen(3000);
console.log("Listening on http://localhost/users");