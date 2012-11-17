exports.generate = generate;
exports.site = site;
exports.tag = tag;
exports.post = post;
exports.category = category;

exports.hello = function(){console.log("hello");}

// a bunch of helper functions to construct a site object in the form 
// that generateWXR expects

function post(title, description, author, pubDate, content){
	return {title: title, 
			description: description, 
			author: author,
			puDate: pubDate,
			content: content};
}

function tag(name, slug){
	return {name: name, slug: slug};
}

function category(name, slug){
	return {name: name, slug: slug};
}

function site(title, description, posts){
	return {title: title, 
			description: description, 
			posts: posts || []};
}

// a function to generate valid WXR for a site
function generate(site){
	var _ = require("underscore");
	var builder = require("xmlbuilder");

	function addPost(post){
	}

	function addCategory(cat, node){
		if(!node)
			node = channel;

		ele.ele('wp:category')
			.ele('wp:category_nicename', cat.slug).up()
			.ele('wp:cat_name').dat(cat.name).up()
	}

	function addTag(tag, ele){
	}
	
	function mapMany(func, array){
		return _.fatten(_.map(func, array),true);
	}

	//lets get started, shall well
	var builder = require('xmlbuilder');

	var doc = builder.create();

	var rss = doc.begin('rss', {version: '1.0', encoding: 'UTF-8'});

	var channel = rss.ele('channel');
	channel.ele('title').dat(site.title).up()
			.ele('description').dat(site.description).up()
			.ele('language', 'en').up()
			.ele('wp:wxr_version', '1.1').up()
			.ele('generator', 'wxr.js').up();

	for(var cat in mapMany(function(post){return post.categories;}, site.posts))
		addCategory(cat);
		
	for(var tag in mapMany(function(post){return post.tags;}, site.posts))
		addTag(tag);

}
