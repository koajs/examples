var app = require('./app');
var co = require('co');
var should = require('should');

var request = require('supertest').agent(app.listen());
var users = app.users;

describe('CRUD Api for storing stuff in MongoDb with monk and co-monk', function(){
	var removeAll = function(done){
		co(function *(){
			yield users.remove({});
		})(done);
	};

	beforeEach(function (done) {
		removeAll(done);
	});

	after(function (done) {
		removeAll(done);
	});

	var user  = { name: 'marcus', password : 'tobi'};
	it('creates a new user', function(done){
		request
			.post('/user')
			.send(user)
			.expect(201)
			.end(done);
	});

	it('gets an existing user', function(done){
		co(function *(){
			var newUser = yield users.insert(user);

			request
				.get('/user/' + newUser._id)
				.set('Accept', 'application/json')
				.expect(200)
				.end(function(err, res){
	        		res.body.name.should.equal('marcus');
	        		res.body.password.should.equal('tobi');
	      		});
      	})(done);
	});

	it('updates an existing user', function(done){
		co(function *(){
			var newUser = yield users.insert(user);
			newUser.name = 'Hugo';
			request
				.put('/user/' + newUser._id)
				.send(user)
				.expect(204);
      	})(done);
	});

	it('deletes an existing user', function(done){
		co(function *(){
			var newUser = yield users.insert(user);

			request
				.del('/user/' + newUser._id)
				.expect(200);
      	})(done);
	});
});