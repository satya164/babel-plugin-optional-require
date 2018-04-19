let a;

try {
  a = function () {
    throw new Error('Cannot find module \'./some-file\'');
  }();
} catch (e) {
  a = require('something-else');
}
