var should = require('should');
var wxr = require('../');
var test = require('./test').test;
require('../thirdparty/linq');

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

test('XML Nodes created', function(){
	var site = new wxr.Site();

	site.title = 'my site title';
	site.link = 'http://blahblahblah.com';

	var doc = site.toWXR();
	
	doc.should.have.property('children');
	doc.children[0].should.have.property('name', '?xml');

	var rootNode = doc.children[1];
	rootNode.should.have.property('name', 'channel');

	var titleNode = rootNode.children[0];	
	titleNode.should.have.property('name', 'title');	

	var valueNode = titleNode.children[0];
	valueNode.should.have.property('value', '<![CDATA[my site title]]>');

	var linkNode = Enumerable.From(rootNode.children)
					.First('$.name == "link"');

	linkNode.should.have.property('name', 'link');
	
});
