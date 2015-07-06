'use strict';
var utils = require('../utils');
var DirBase = require('../dir-base');
var helpers = require('../helpers');


module.exports = DirBase.extend({
  constructor: function () {
    DirBase.apply(this, arguments);
    this.option('template', {alias: 't', desc: 'reuse existing template for item view'});
  },
  initializing: function () {
    this.template = this.options.template || this.options.t;
    if (this.template) {
      helpers.templatesOption(this.options.directory, this.template, utils.type.itemview);
      this.templateName = this.template;
    } else {
      this.templateName = this.name;
    }
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('item-view.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.itemview)),
      {dest: utils.templateNameWithPath(this.options.directory, this.name, utils.type.itemview)}
    );
    if (!this.template) {
      this.fs.copyTpl(
        this.templatePath('template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.itemview)),
        {title: this.name}
      );
    }
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


