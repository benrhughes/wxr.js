var builder = require('xmlbuilder');

function Post(){
    if(!this instanceof Post)
        return new Post();

    this.categories = [];
	this.tags = [];

	this.comments = [];
	
	this.attachments = [];
}

exports.Post = Post;

Post.prototype = {
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
			root.ele('category')
				.att('nicename', this.categories[i].niceName)
				.att('domain', 'category')
				.dat(this.categories[i].name);
		}

		for(var i in this.tags){
			root.ele('tag')
				.att('nicename', this.tags[i].slug)
				.att('domain', 'post_tag')
				.dat(this.tags[i].name);
		}

		for(var i in this.comments){
			root.ele('wp:comment');
				
		}
		
		return post;	
	}
}
