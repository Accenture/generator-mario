'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');

module.exports = yeoman.generators.NamedBase.extend({
  constructor: function () {
    yeoman.generators.NamedBase.apply(this, arguments);
  },
  initializing: function () {
    this.option('directory', {desc: 'Define own directory'});

    if(!this.options.directory) {
      this.log.error('Directory Flag is required, exiting!');
      process.exit(1);
    }
  },
  writing: function () {
    if (this.options.directory) {
      var baseDir = 'app/scripts/apps/';
      this.fs.copyTpl(
        this.templatePath('controller.js'),
        this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-controller.js')));
    }
  }
});
