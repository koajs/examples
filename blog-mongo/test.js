var app = require('./index.js');
var co = require('co');

var should = require('should');
var request = require('supertest').agent(app.listen());

var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/koaBlog');
var posts = wrap(db.get('posts'));


describe('Blog with mongo:', function(){
	var removeAll = function(done){
		co(function *(){
			yield posts.remove({});
		})(done);
	};

	beforeEach(function (done) {
		removeAll(done);
	});

	afterEach(function (done) {
		removeAll(done);
	});

	var test_post  = { title: 'A nice title', body : 'Short body. Yeah!'};


	it('creates a new post', function(done){
		request
			.post('/post')
			.send(test_post)
			.expect(302)
			.expect('location', '/')
			.end(done);
	});

	it('renders view page for existing post', function(done){
		co(function *(){
			var post = yield posts.insert(test_post);
			request
				.get('/post/' + post._id)
				.expect('Content-Type', /text/)
	      		.expect(200);
	    })(done);
	});

	it('renders view page for a number of posts', function(done){
		co(function *(){
			yield posts.insert(test_post)
			yield posts.insert({ title: 'Another title', body : 'Short body. Yeah!'})
			yield posts.insert({ title: 'Yet another title', body : 'Short body. Yeah!'})

			request
				.get('/')
				.expect('Content-Type', /text/)
	      		.expect(200);
	    })(done);
	});

	it('updates an existing post', function(done){
		co(function *(){
			var post = yield posts.insert(test_post);
			var postUrl = '/post/' + post._id;
			request
				.post(postUrl)
				.send({title: 'Updated title', body: 'Updated body'})
				.expect(302)
				.expect('location', postUrl);
	    })(done);
	});

	it('deletes an existing post', function(done){
		co(function *(){
			var post = yield posts.insert(test_post);
			var id = post._id;
			var deleteUrl = '/post/' + id + '/delete';
			request
				.get(deleteUrl)
				.expect(302)
				.expect('location', '/');
	    })(done);
	});
});