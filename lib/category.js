exports.Category = Category = function(){

};

var p = Category.prototype;
Category.prototype.name = '';
Category.prototype.niceName = '';
Category.prototype.parentCategory = new Category();


exports.Tag = Tag = function(){

};

var p = Tag.prototype;
Tag.prototype.slug = '';
Tag.prototype.name = '';
