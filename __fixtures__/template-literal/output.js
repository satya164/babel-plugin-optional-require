let a;

try {
  a = function () {
    throw new Error("Cannot find module 'non-existing'");
  }();
} catch (e) {
  a = require('something-else');
}
