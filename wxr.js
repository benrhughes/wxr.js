exports.Site = require('./lib/site').Site;
exports.Post = require('./lib/post').Post;
exports.Comment = require('./lib/comment').Comment;
exports.Attachment = require('./lib/attachment').Attachment;
exports.Category = require('./lib/category').Category;
exports.Tag = require('./lib/category').Tag;

exports.export = function(site, file){
	console.log('Exported to ' + file);
};
