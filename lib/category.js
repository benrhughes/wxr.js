var Category = function(name, niceName){
	if(!this instanceof Category)
		return new Category();

	this.name = name;
	this.niceName = niceName;
};

exports.Category = Category;

Category.prototype = {
  
};

var Tag = function(name, slug){
	 if(!this instanceof Tag)
        return new Tag();

     this.name = name;
     this.slug = slug;
};

exports.Tag = Tag;
