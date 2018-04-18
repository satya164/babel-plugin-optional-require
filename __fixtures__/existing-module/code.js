let a;

try {
  a = require('resolve-cwd');
} catch(e) {
  a = require('something-else');
}
