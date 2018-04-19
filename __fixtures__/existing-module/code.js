let a;

try {
  a = require('resolve-from');
} catch(e) {
  a = require('something-else');
}
