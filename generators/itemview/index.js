'use strict';
var utils = require('../utils');
var DirBase = require('../dir-base');

module.exports = DirBase.extend({
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('item-view.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.itemview)),
      {dest: utils.templateNameWithPath(this.options.directory, this.name, utils.type.itemview)}
    );
    this.fs.copyTpl(
      this.templatePath('template.hbs'),
      this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.itemview)),
      {title: this.name});

    this.fs.copyTpl(
      this.templatePath('item-view-test.js'),
      this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.itemview)),
      {
        dest: utils.amd(this.name, utils.type.itemview),
        view: utils.className(this.name, utils.type.itemview)
      }
    );
  }
});
