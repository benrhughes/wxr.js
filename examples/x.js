var wxr = require('../wxr');

var site = new wxr.Site();
site.title = "Ben's blog";
site.description = "This is Ben's blog";

var cat = new wxr.Category();
cat.name = "Stuff I Love";
cat.niceName = "stuff";

site.categories.push(cat);

var post = new wxr.Post();
post.title = "Ben's first blog post";
post.name = 'first';
post.creator = 'Ben';

post.categories.push(cat);

site.posts.push(post);

console.log(site.toWXR().toString({pretty: true}));
