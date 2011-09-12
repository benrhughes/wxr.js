var wxr = require('../wxr');

var site = new wxr.Site();
site.title = "Ben's blog";
site.description = "This is Ben's blog";

var cat = new wxr.Category();
cat.name = "Stuff I Love";
cat.niceName = "stuff";

site.categories.push(cat);

console.log(site.toWXR());
