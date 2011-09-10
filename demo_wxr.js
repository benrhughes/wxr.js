var wxr = require('./wxr');

var site = new wxr.Site();

site.title = "Ben's wordpress site";
site.link = 'http://benswordpresssite.wordpress.com';
site.description = 'Just another Wordpress blog';
site.language = 'en';
site.pubDate = 'Fri, 11 Jan 2008 20:23:05 +0000';

var post = new wxr.Post();
post.title = 'About this site';
post.name = 'about';
post.link = site.link + '/' + post.name + '/';
post.creator = 'Ben';
post.description = 'My about page';
post.content = 'This is CDATA encoded contents of my about page';
post.postId = 2;
post.date = site.pubDate;
post.gmtDate = post.date;
post.commentStatus = 'open';
post.type = 'page'; // page || post?
post.parentId = 0;

post.categories.push('admin');
post.tags.push('admin');

var comment = new wxr.Comment(post);
comment.id = 3;
comment.author.name = 'Fred';
comment.author.email = 'fred@fred.net';
comment.author.url = 'http://fred.net';
comment.author.ip = '127.0.0.1';

comment.userId = 12345;
comment.approved = 1;
comment.date = '2008-05-16 22:49:10';
comment.gmtDate = '2008-05-16 22:49:10'

var att = new wxr.Attachment(post); 
// extends Post, type === 'attachment'
att.url = site.link + 'files/2010/08/stuff.jpg';
att.metadata = 'metadata stuff';


site.export('/path/to/file');
