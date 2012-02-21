var builder = require('xmlbuilder');

function Post(){
    if(!this instanceof Post)
        return new Post();
}

exports.Post = Post;

Post.prototype = {
	categories: [],
	tags: [],

	comments: [],
	attachments: [],

	toWXR: function(){
		var dateString = this.date ? this.date.toString() : '';

		var post = builder.create();
		
		var root = post.begin('item')
			.ele('title').dat(this.title).up()
			.ele('link', this.link).up()
			.ele('pubDate', dateString).up()
			.ele('dc:creator', this.creator).up()
			.ele('description').dat(this.description).up()
			.ele('content:encoded').dat(this.content).up()
			.ele('wp:post_id', this.postId).up()
			.ele('wp:post_date', dateString).up()
			.ele('wp:post_date_gmt', dateString).up()
			.ele('wp:post_name', this.name).up()
			.ele('wp:post_type', 'post').up()
			.ele('wp:status', this.status).up()
			.ele('wp:comment_status', this.commentStatus).up()
			.ele('wp:post_parent', this.parentId).up()
		
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
