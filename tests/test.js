exports.test = function(name, fn){
  try {
    fn();
  } catch (err) {
    console.log('    \x1b[31m%s', name);
    console.log('    %s\x1b[0m', err.stack);
    return;
  }
  console.log('  √ \x1b[32m%s\x1b[0m', name);
}
