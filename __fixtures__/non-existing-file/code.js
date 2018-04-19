let a;

try {
  a = require('./some-file');
} catch(e) {
  a = require('something-else');
}
