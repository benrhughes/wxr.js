var should = require('should');
var wxr = require('../');
var test = require('./test').test;
var _ = require('underscore');

var site = new wxr.Site();

test('Constructor sets generator', function(){
	site.should.have.property('generator', 'wxr.js');
});

test('Expected properties exist', function(){
	site.should.have.property('title');
	site.should.have.property('link');
	site.should.have.property('description');
	site.should.have.property('language', 'en');
	site.should.have.property('pubDate');
	site.should.have.property('baseSiteURL');
	site.should.have.property('baseBlogURL');

	site.should.have.property('posts');
	site.should.have.property('tags');
	site.should.have.property('categories');

	site.should.respondTo('toWXR');
});

test('XML node created', function(){
	var site = new wxr.Site();

	var doc = site.toWXR();
	
	doc.should.have.property('children');
	doc.children[0].should.have.property('name', '?xml');
});

test('Channel node created', function(){

	var site = new wxr.Site();
	var doc = site.toWXR();

	var rootNode = doc.children[1];
	rootNode.should.have.property('name', 'channel');
});

test('Title node created', function(){
	var site = new wxr.Site();
	
	site.title = 'my site title';
	var doc = site.toWXR();
	
	var rootNode = doc.children[1];
	
	var titleNode = _(rootNode.children)
					.detect(function(c){ return c.name == 'title';});

	should.exist(titleNode);
 	
	var valueNode = titleNode.children[0];
	valueNode.should.have.property('value', '<![CDATA[my site title]]>');
});
test('Link node created', function(){
	var site = new wxr.Site();
	
	site.link = 'http://blahblahblah.com';
	
	var doc = site.toWXR();
	
	var rootNode = doc.children[1];
	
	var linkNode = _(rootNode.children)
					.detect(function(c){ return c.name == 'link';});

	should.exist(linkNode);

	valueNode = linkNode.children[0];

	valueNode.should.have.property('value', site.link);
});

test('Description node created', function(){
	var site = new wxr.Site();
	
	site.description = "Ben's awesome site";
	
	var doc = site.toWXR();
	
	var rootNode = doc.children[1];
	
	var descNode = _(rootNode.children)
					.detect(function(c){ return c.name == 'description';});

	should.exist(descNode);

	valueNode = descNode.children[0];
	valueNode.should.have.property('value', "<![CDATA[Ben\'s awesome site]]>");
});
