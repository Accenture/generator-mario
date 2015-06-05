'use strict';

var generators = require('yeoman-generator');

var path = require('path');

module.exports = generators.NamedBase.extend({
  constructor: function (/*args, options*/) {
    generators.generators.NamedBase.apply(this, arguments);
    this.option('directory', {desc: 'create collection view within specified directory'});
    this.option('itemview', {desc: 'specify a item view to use with the collection view (they have to be in the same directory)'});
  },
  initializing: function () {
    if (!this.options.directory) {
      this.log.error('--directory option is required!');
      process.exit(1);
    }
  },
  writing: function () {
    var baseDir = 'app/scripts/apps/';
    var childViewPath = './' + this.name + '-item-view';
    var childViewName = this._.capitalize(this._.camelize(this.name)) + 'ItemView';
    if (this.options.itemview) {
      childViewPath = './' + this.options.itemview;
      childViewName = this._.capitalize(this._.camelize(this.options.itemview));
    }

    this.fs.copyTpl(
      this.templatePath('collection-view.js'),
      this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-collection-view.js')),
      {
        childPath: childViewPath,
        childItemView: childViewName
      }
    );
    this.fs.copyTpl(
      this.templatePath('collection-view-test.js'),
      this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-collection-view-test.js')),
      {
        viewPath: './' + this.name + '-collection-view',
        viewName: this._.capitalize(this._.camelize(this.name) + 'CollectionView')
      }
    );

    if (!this.options.itemview) {
      this.composeWith('aowp-marionette:itemview', {options: {directory: this.options.directory}, args: [this.name]});
    }
  }
});
