let a;

try {
  a = function () {
    throw new Error('Cannot find module \'something\'');
  }();
} catch (e) {
  a = require('something-else');
}
