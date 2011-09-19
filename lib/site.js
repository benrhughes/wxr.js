var builder = require('xmlbuilder');

exports.Site = Site = function(){
	this.generator = 'wxr.js';	
};

Site.prototype = {
	title: '',
	link: '',
	description: '',
	language: '',
	pubDate: new Date(),
	baseSiteURL: '',
	baseBlogURL: '',

	categories: [],
	tags: [],

	posts: [],

	toWXR: function(){
		var doc = builder.create();
		
		var channel = doc.begin('channel', {version: '1.0', encoding: 'UTF-8'})
			.ele('title').dat(this.title).up()
			.ele('link', this.link).up()
			.ele('description').dat(this.description).up()
			.ele('language', this.language).up()
			.ele('generator', 'http://github.com/benrhughes/wrx').up()
			.ele('pubDate', this.pubDate.toString()).up()
			.ele('base_site_url', this.baseSiteURL).up()
			.ele('base_blog_url', this.baseBlogURL).up();

		for(var i in this.categories){
			channel.ele('wp:category')
				.ele('wp:category_nicename', this.categories[i].niceName).up()
				.ele('wp:category_parent', this.categories[i].parentCategory)
				.up()
				.ele('wp:cat_name').dat(this.categories[i].name).up()
			.up();
		}

		for(var i in this.tags){
			channel.ele('wp:tag')
				.ele('wp:tag_slug', this.tags[i].slug).up()
				.ele('wp:tag_name').dat(this.tags[i].name).up()
			.up();
		}

		for(var i in this.posts){
			channel.children.push(this.posts[i].toWXR());
		}

		return doc;
	} 
}
