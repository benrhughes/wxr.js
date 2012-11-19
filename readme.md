##WXR node.js module

This module creates files in the Wordpress eXtended Rss format (WXR). 

This is an example of what the API may look like when it's done.

``` javascript
var wxr = require('wxr');

var site = wxr.site('Test Site', 'A site for testing');

var post = wxr.post('First!', 'My first post', 'Ben', new Date());;
post.content = "This if my very first post, I'm <b>really</b> proud of it";
post.categories.push(wxr.category('My Stuff', 'stuff'));

site.posts.push(post);

console.log(wxr.generate(site)); 
```
