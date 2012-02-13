function Comment(){
    if (!this instanceof Comment)
        return new Comment();
}

Comment.prototype = {
	author: Object
};

exports.Comment = Comment;