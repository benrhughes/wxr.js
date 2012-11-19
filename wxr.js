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
			puDate: pubDate,
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
		var dateString = post.pubDate;

		var node = channel.ele('item')
			.ele('title').dat(post.title).up()
			.ele('pubDate', dateString).up()
			.ele('dc:creator', post.author).up()
			.ele('description').dat(post.description).up()
			.ele('content:encoded').dat(post.content).up()
			.ele('wp:post_date', dateString).up()
			.ele('wp:post_date_gmt', dateString).up()
			.ele('wp:post_type', 'post').up()
			.ele('wp:status', post.status).up();
		
		for(var cat in categories)
			addPostCategory(node, cat, 'category');

		for(var tag in tags)
			addTag(node, tag, 'post_tag');

	}


	function addPostCategory(post, cat, domain){
		post.ele("category", {nicename: cat.name, domain: domain} );
	}

	function addSiteCategory(cat){
		channel.ele('wp:category')
				.ele('wp:category_nicename', cat.slug).up()
				.ele('wp:cat_name').dat(cat.name).up();
	}

	function addSiteTag(tag, node){
		channel.ele('wp:tag')
				.ele('wp:tag_slug', tag.slug).up()
				.ele('wp:tag_name').dat(tag.name).up();
	}

	function mapMany(array, func){
		return _.flatten(_.map(array, func),true);
	}

	//lets get started, shall well
	var doc = xml.create('rss', {version: '1.0', encoding: 'UTF-8'});

	var channel = doc.ele('channel');
	channel.ele('title').dat(site.title).up()
			.ele('description').dat(site.description).up()
			.ele('language', 'en').up()
			.ele('wp:wxr_version', '1.1').up()
			.ele('generator', 'wxr.js').up();

	var categories = mapMany(site.posts, function(post){return post.categories});
	_.each(categories, addSiteCategory);
		
	
	var tags = mapMany(site.posts, function(post){return post.tags;});
	_.each(tags, addSiteTag);
	
	_.each(site.posts, addPost);

	doc.end({pretty: true});

	return doc;
}
