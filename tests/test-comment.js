require('should');
var wxr = require('../');
var test = require('./test').test;

var comment = new wxr.Comment();

test("Has title", function(){
    comment.should.have.property('title');
});