var wxr = require('./wxr');

var site = wxr.site('Test Site', 'A site for testing');

var today = new Date();

var post = wxr.post('First!', 'My first post', 'Ben', today);;
post.content = "This if my very first post, I'm <b>really</b> proud of it";
post.categories.push(wxr.category('My Stuff', 'stuff'));

site.posts.push(post);

console.log(wxr.generate(site)); 
