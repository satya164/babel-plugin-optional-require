let a;

try {
  a = function () {
    throw new Error("Cannot resolve builtin module 'fs'");
  }();
} catch (e) {
  a = require('path');
}
