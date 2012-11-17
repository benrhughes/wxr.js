// a bunch of helper functions to construct a site object in the form 
// that generateWXR expects

function post(title, description, author, pubDate, content){
}

function tag(name, slug){
}

function category(name, slug){
}

function site(title, description, posts){
}

// a function to generate valid WXR for a site
function generateWXR(site){
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
