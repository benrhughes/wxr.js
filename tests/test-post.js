require('should');
var wxr = require('../');
var test = require('./test').test;
var post = new wxr.Post();

test("Expected properties exist", function(){
	post.should.have.property("title");
	post.should.have.property("link");
	post.should.have.property("name");
	post.should.have.property("creator");
	post.should.have.property("description");
	post.should.have.property("content");
	post.should.have.property("status");
	post.should.have.property("postId");
	post.should.have.property("date");
	post.should.have.property("commentStatus");
	post.should.have.property("type");
	post.should.have.property("parentId");

	post.should.have.property("categories");
	post.should.have.property("tags");

	post.should.have.property("comments");
	post.should.have.property("attachments");

	post.should.respondTo("toWXR");
});