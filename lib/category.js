exports.Category = Category = function(){

};

Category.prototype.name = undefined;
Category.prototype.niceName = undefined;
Category.prototype.parentCategory = new Category();


exports.Tag = Tag = function(){

};

Tag.prototype.slug = '';
Tag.prototype.name = '';
