let a;

try {
  a = require('non-existing');
} catch(e) {
  a = require('something-else');
}
