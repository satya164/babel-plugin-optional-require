let a;

try {
  a = require('some' + 'thing');
} catch (e) {
  a = require('something-else');
}
