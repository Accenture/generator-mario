'use strict';
var generators = require('yeoman-generator');
var DirectoryBase = generators.NamedBase.extend({
  text: 'create item (model, collection, view, router, controller) within specified directory',
  constructor: function (/*args, options*/) {
    generators.generators.NamedBase.apply(this, arguments);
    this.option('directory', {desc: this.text});
    // this.options.directory = 'app/scripts/apps/';

    if (!this.options.directory) {
      this.log.error('--directory option is required!');
      process.exit(1);
    }
  }
});

module.exports = DirectoryBase;
