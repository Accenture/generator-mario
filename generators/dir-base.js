'use strict';

var generators = require('yeoman-generator');
var utils = require('./utils');
var DirectoryBase = generators.NamedBase.extend({
  text: 'create item (model, collection, view, router, controller) within specified directory',
  constructor: function(/*args, options*/) {
    generators.generators.NamedBase.apply(this, arguments);
    this.option('directory', {alias: 'd', desc: this.text});

    this.options.directory = this.options.directory || this.options.d;

    if (!this.options.directory) {
      this.options.directory = this.name;
    }

    this.options.directory = utils.truncateBasePath(this.options.directory);
  },
  initializing: function() {
    var config = this.config.get('preferences') || {};

    if (config.ecma) {
      this.options.ecma = config.ecma;
    }
    if (config.tests) {
      this.options.tests = config.tests;
    }

    this.testBaseDir = (this.options.tests === 'custom') ? config.testFolder + 'apps' : 'app/scripts/apps';
    this.sourceDir = (this.options.ecma === 6) ? 'es6/' : 'es5/';
  }
});

module.exports = DirectoryBase;
