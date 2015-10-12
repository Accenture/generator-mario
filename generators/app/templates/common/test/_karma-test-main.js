'use strict';

var allRequiredFiles = []; <% if (tests === 'appcode') { %>
var SRC_REGEXP = /app\/scripts\/apps\/.+\.js$/; <% } else if(tests === 'separate') { %>
var SRC_REGEXP = /(test)\.js$/; <% } %>
var REQUIRE_BASE_URL = '/base/app/scripts';

var pathToSourceFile = function(path) {
  return path.substring(REQUIRE_BASE_URL.length + 1, path.length - 3);
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (SRC_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    <% if (tests === 'appcode') { %>
    allRequiredFiles.push(pathToSourceFile(file));
    <% } else { %>
    allRequiredFiles.push(file);
    <% } %>
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: REQUIRE_BASE_URL,

  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    radio: '../bower_components/backbone.radio/build/backbone.radio',
    marionette: '../bower_components/backbone.marionette/lib/backbone.marionette',
    handlebars: '../bower_components/handlebars/handlebars.runtime',
    templates: '../../.tmp/scripts/templates'
  },

  // dynamically load all test files
  deps: allRequiredFiles,


  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
