// 
// Tests to ensure that the site WXR is created properly. NB, for the most part
// we're checking the JSON, not the resultant XML (produced by xmlbuilder)
//
var should = require('should');
var wxr = require('../');
var test = require('./test').test;
var _ = require('underscore');

var site = new wxr.Site();
site.title = "Test";
site.link = 'http://benswordpresssite.wordpress.com';
site.description = 'Just another Wordpress blog';
site.pubDate = 'Fri, 11 Jan 2008 20:23:05 +0000';

test('Constructor sets generator', function(){
	site.should.have.property('generator', 'wxr.js');
});

test('Expected properties exist', function(){
//	site.should.respondTo('toWXR');
});

test('XML node created', function(){
	var doc = site.toWXR();
	
	doc.should.have.property('children');
	doc.children[0].should.have.property('name', '?xml');
});

test('Channel node created', function(){
	var doc = site.toWXR();

	var rootNode = doc.children[1];
	rootNode.should.have.property('name', 'channel');
});

test('Title node created', function(){
	
	site.title = 'my site title';
	var doc = site.toWXR();
	
	var node = _(doc.children[1].children)
					.detect(function(c){ return c.name == 'title';});

	should.exist(node);
 	
	var value = node.children[0];
	value.should.have.property('value', '<![CDATA[my site title]]>');
});

test('Link node created', function(){
	site.link = 'http://blahblahblah.com';
	
  	var doc = site.toWXR();
	var node = _(doc.children[1].children)
					.detect(function(c){ return c.name == 'link';});

	should.exist(node);

	value = node.children[0];
	value.should.have.property('value', site.link);
});

test('Description node created', function(){
	site.description = "Ben's awesome site";
	
	var doc = site.toWXR();
	var node = _(doc.children[1].children)
					.detect(function(c){ return c.name == 'description';});

	should.exist(node);

	value = node.children[0];
	value.should.have.property('value', "<![CDATA[Ben\'s awesome site]]>");
});

test('Language node created', function(){
	
	var doc = site.toWXR();
	var node = _(doc.children[1].children)
					.detect(function(c){ return c.name == 'language';});

	should.exist(node);

	value = node.children[0];
	value.should.have.property('value', 'en'); 
});

test('Generator node created', function(){
	
	var doc = site.toWXR();
	var node = _(doc.children[1].children)
					.detect(function(c){ return c.name == 'generator';});

	should.exist(node);

	value = node.children[0];
	value.should.have.property('value', 'http://github.com/benrhughes/wrx'); 
});

test('PubDate node created', function(){
	site.pubDate = Date.now();	
	
	var doc = site.toWXR();
	var node = _(doc.children[1].children)
					.detect(function(c){ return c.name == 'pubDate';});

	should.exist(node);

	value = node.children[0];
	value.should.have.property('value', site.pubDate.toString()); 
});

test('Base site URL node created', function(){
	site.baseSiteURL = 'http://mysite.com';	
	
	var doc = site.toWXR();
	var node = _(doc.children[1].children)
					.detect(function(c){ return c.name == 'base_site_url';});

	should.exist(node);

	value = node.children[0];
	value.should.have.property('value', site.baseSiteURL); 
});

test('Base blog URL node created', function(){
	site.baseSiteURL = 'http://mysite.com/blog';	
	
	var doc = site.toWXR();
	var node = _(doc.children[1].children)
					.detect(function(c){ return c.name == 'base_blog_url';});

	should.exist(node);

	value = node.children[0];
	value.should.have.property('value', site.baseBlogURL); 
});
