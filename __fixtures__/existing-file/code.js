let a;

try {
  a = require('./output');
} catch(e) {
  a = require('something-else');
}
