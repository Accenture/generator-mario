'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');

module.exports = DirBase.extend({
  constructor: function (/*args, options*/) {
    DirBase.apply(this, arguments);
    this.option('itemview', {alias:'i', desc: 'creates itemView within specified directory'});
  },
  initializing: function () {
    this.itemview = this.options.itemview || this.options.i;
    if (!this.options.itemview) {
      this.itemview = this.name + '-item-view';
    }
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('composite-view.js'),
      // this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-composite-view.js')),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.compositeview)),
      {
        itemview: utils.amd(this.itemview, utils.type.itemview),
        template: utils.templateNameWithPath(this.options.directory, this.name, utils.type.compositeview)
      });

    this.fs.copyTpl(
      this.templatePath('composite-view.hbs'),
      // this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-composite-view-template.hbs')));
      this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.compositeview))
    );

    if (!this.options.itemview) {
      this.composeWith('aowp-marionette:itemview', {options: {directory: this.options.directory}, args: [this.name]});
    }

    this.fs.copyTpl(
      this.templatePath('composite-view-test.js'),
      // this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-composite-view-test.js')),
      this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.compositeview)),
      {
        compview: utils.amd(this.name, utils.type.compositeview),
        viewName: utils.className(this.name, utils.type.compositeview)
      }
    );
  }
});
