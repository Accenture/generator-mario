'use strict';

var allRequiredFiles = [];

var SRC_REGEXP = /app\/scripts\/apps\/.+\.js$/;
var REQUIRE_BASE_URL = '/base/app/scripts';

var pathToSourceFile = function(path) {
  return path.substring(REQUIRE_BASE_URL.length + 1, path.length - 3);
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (SRC_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allRequiredFiles.push(pathToSourceFile(file));
  }
});
