exports.Site = require('./lib/site').Site;
exports.Post = require('./lib/post').Post;
exports.Comment = require('./lib/comment').Comment;
exports.Attachment = require('./lib/attachment').Attachment;

exports.export = function(site, filePath){
	console.log('Exported to ' + filePath);
};
