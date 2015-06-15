'use strict';

var generators = require('yeoman-generator');

var path = require('path');

module.exports = generators.NamedBase.extend({
  constructor: function (/*args, options*/) {
    generators.generators.NamedBase.apply(this, arguments);
  },
  initializing: function () {
    if (!this.options.directory) {
      this.log.error('--directory option is required, cancelling ...');
      process.exit(1);
    }

    this.option('directory', {desc: 'creates compositeView within specified directory'});
    this.option('itemview', {desc: 'creates itemView within specified directory'});

    this.itemview = this.options.itemview ;

    if (!this.options.itemview) {
      this.itemview = this.name + '-item-view';
    }
  },
  writing: function () {
    var baseDir = 'app/scripts/apps/';

    this.fs.copyTpl(
      this.templatePath('composite-view.js'),
      this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-composite-view.js')),
      {
        directory: this.options.directory,
        itemview: this.itemview,
        template: this.name + '-composite-view.hbs'
      });

    this.fs.copyTpl(
      this.templatePath('composite-view.hbs'),
      this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-composite-view-template.hbs')));

    if (!this.options.itemview) {
      this.composeWith('aowp-marionette:itemview', {options: {directory: this.options.directory}, args: [this.name]});
    }

    this.fs.copyTpl(
      this.templatePath('composite-view-test.js'),
      this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-composite-view-test.js')),
      {
        compview: this.name + '-composite-view',
        viewName: this._.capitalize(this._.camelize(this.name + 'CompositeView'))
      }
    );
  }
});
