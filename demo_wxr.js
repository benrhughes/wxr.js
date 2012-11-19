var wxr = require('./wxr');

var site = wxr.site('Test Site', 'A site for testing');

var post = wxr.post('First!', 'My first post', 'Ben', Date.now);
post.content = "This if my very first post, I'm <b>really</b> proud of it";

site.posts.push(post);

var xmlDoc = wxr.generate(site); // via xmlbuilder
console.log(xmlDoc.toString()); 
