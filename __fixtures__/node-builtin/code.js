let a;

try {
  a = require('fs');
} catch (e) {
  a = require('path');
}
