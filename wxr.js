// public stuff
exports.generate = generate;
exports.site = site;
exports.tag = tag;
exports.post = post;
exports.category = category;

// a bunch of helper functions to construct a site object in the form 
// that 'generate' expects
function post(title, description, author, pubDate, content, status, categories, tags){
	return {title: title, 
			description: description, 
			author: author,
			pubDate: pubDate instanceof Date ? pubDate.toString() : pubDate,
			content: content,
			status: status,
			categories: categories || [],
			tags: tags || []};
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
			posts: posts || []}
}

// a function to generate valid WXR for a site
function generate(site){
	var _ = require("underscore");
	var xml = require("xmlbuilder");

	function addPost(post){
		//post(title, description, author, pubDate, content, status, categories, tags)
		var node = channel.ele('item')
			.ele('title').dat(post.title).up()
			.ele('post.pubDate', post.pubDate).up()
			.ele('dc:creator', post.author).up()
			.ele('description').dat(post.description).up()
			.ele('content:encoded').dat(post.content).up()
			.ele('wp:post_date', post.pubDate).up()
			.ele('wp:post_date_gmt', post.pubDate).up()
			.ele('wp:post_type', 'post').up()
			.ele('wp:status', post.status).up();

		function add(cat, domain){
			node.ele("category", {nicename: cat.name, domain: domain} );
		}

		_.each(post.categories, function(c){add(c, 'category')});
		_.each(post.tags, function(t){add(t, 'post_tag')});
	}

	function addCat(cat){
		channel.ele('wp:category')
				.ele('wp:category_nicename', cat.slug).up()
				.ele('wp:cat_name').dat(cat.name).up();
	}

	function addTag(tag){
		channel.ele('wp:tag')
				.ele('wp:tag_slug', tag.slug).up()
				.ele('wp:tag_name').dat(tag.name).up();
	}

	//lets get started, shall we
	var doc = xml.create('rss', {version: '1.0', encoding: 'UTF-8'});

	var channel = doc.ele('channel')
					.ele('title').dat(site.title).up()
					.ele('description').dat(site.description).up()
					.ele('language', 'en').up()
					.ele('wp:wxr_version', '1.1').up()
					.ele('generator', 'wxr.js').up();

	_.each(_.flatten(_.pluck(site.posts, 'categories')), addCat);
		
	_.each(_.flatten(_.pluck(site.posts, 'tags')), addTag); 
	
	_.each(site.posts, addPost);

	doc.end();

	return doc.toString({pretty:true});
}
