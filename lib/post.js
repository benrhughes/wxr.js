var builder = require('xmlbuilder');

exports.Post = Post = function(site){

};

Post.prototype = {
	title: '',
	name: '',
	link: '',
	creator: '',
	description: '',
	content: '',
	status: '',
	postId: 0,
	date: new Date(),
	commentStatus: '',	
	type: '',
	parentId: 0,
	
	categories: [],
	tags: [],

	comments: [],
	attachments: [],

	toWXR: function(){
		var post = builder.create();
		var root = post.begin('post')
			.ele('title').dat(this.title).up()
			.ele('link', this.link).up()
			.ele('pubDate', this.date.toString()).up()
			.ele('dc:creator', this.creator).up()
			.ele('description').dat(this.description).up()
			.ele('content:encoded').dat(this.content).up()
			.ele('wp:post_id', this.postId).up()
			.ele('wp:post_date', this.date.toString()).up()
			.ele('wp:post_date_gmt', this.date.toString()).up()
			.ele('wp:post_name', this.name).up()
			.ele('wp:status', this.status).up()
			.ele('wp:comment_status', this.commentStatus).up()
			.ele('wp:post_parent', this.parentId).up()
			.ele('wp:post_type', this.type).up();
		
		for(var i in this.categories){
			root.ele('wp:category')
				.ele('wp:category_nicename', this.categories[i].niceName).up()
				.ele('wp:category_parent', this.categories[i].parentCategory)
				.up()
				.ele('wp:cat_name').dat(this.categories[i].name).up()
		}

		for(var i in this.tags){
			root.ele('wp:tag')
				.ele('wp:tag_slug', this.tags[i].slug).up()
				.ele('wp:tag_name').dat(this.tags[i].name).up()
			.up();
		}

		for(var i in this.comments){
			root.ele('wp:comment');
				
		}
		
		return post;	
	}
}
