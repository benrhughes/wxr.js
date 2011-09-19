var should = require('should');
var wxr = require('../');

function test(name, fn){
  try {
    fn();
  } catch (err) {
    console.log('    \x1b[31m%s', name);
    console.log('    %s\x1b[0m', err.stack);
    return;
  }
  console.log('  √ \x1b[32m%s\x1b[0m', name);
}

var site = new wxr.Site();

test('Constructor sets generator', function(){
	site.should.have.property('generator', 'wxr.js');
});

test('Expected properties exist', function(){
	site.should.have.property('title', '');
	site.should.have.property('link', '');
});
