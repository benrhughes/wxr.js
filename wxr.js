exports.Site = require('./lib/site').Site;
exports.Post = require('./lib/post').Post;
exports.Comment = require('./lib/comment').Comment;
exports.Attachment = require('./lib/attachment').Attachment;
exports.Category = require('./lib/category').Category;
exports.Tag = require('./lib/category').Tag;

var fs = require('fs');

exports.export = function(site, file){
	
	fs.writeFile(file, site.toWXR().toString({ pretty:true }));

	console.log('Exported to ' + file);
};
