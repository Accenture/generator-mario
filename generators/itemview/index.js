'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');

module.exports = yeoman.generators.NamedBase.extend({
  constructor: function () {
    yeoman.generators.NamedBase.apply(this, arguments);
  },
  initializing: function () {
    this.option('directory', {desc: 'Define own directory'});
  },
  writing: function () {
    if (this.options.directory) {
      var baseDir = 'app/scripts/apps/';
      this.fs.copyTpl(
        this.templatePath('item-view.js'),
        this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-item-view.js')),
        {dest: baseDir + this.options.directory + '/' + this.name + '-template.hbs'});

      this.fs.copyTpl(
        this.templatePath('template.hbs'),
        this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-template.hbs')),
        {title: this.name});

      this.fs.copyTpl(
        this.templatePath('item-view-test.js'),
        this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-item-view-test.js')),
        {dest: './' + this.name + '-item-view', view: this._.capitalize(this._.camelize(this.name + '-ItemView'))});
    }
  }
});
