var builder = require('xmlbuilder');

var Site = function(){
    if ( !(this instanceof Site) )
      return new Site();
      
	this.generator = 'http://github.com/benrhughes/wxr.js';	
    this.language = 'en';
};

exports.Site = Site;

Site.prototype = {
	categories: [],
	tags: [],
	posts: [],

	toWXR: function(){
		var doc = builder.create();
		
		var dateString = this.pubDate ? this.pubDate.toString() : '';

		var channel = doc.begin('channel', {version: '1.0', encoding: 'UTF-8'})
			.ele('title').dat(this.title).up()
			.ele('link', this.link).up()
			.ele('description').dat(this.description).up()
			.ele('language', this.language).up()
			.ele('wp:wxr_version', '1.1').up()
			.ele('generator', this.generator).up()
			.ele('pubDate', dateString).up()
            .ele('wp:base_site_url', this.baseSiteURL).up()
            .ele('wp:base_blog_url', this.baseBlogURL).up();

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
};
