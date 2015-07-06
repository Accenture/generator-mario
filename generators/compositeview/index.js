'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');
var helpers = require('../helpers');

module.exports = DirBase.extend({
  constructor: function (/*args, options*/) {
    DirBase.apply(this, arguments);
    this.option('itemview', {alias: 'i', desc: 'creates itemView within specified directory'});
    this.option('template', {alias: 't', desc: 'reuse existing template for composite view'});
  },
  initializing: function () {
    this.itemview = this.options.itemview || this.options.i;
    this.template = this.options.template || this.options.t;
    if (!this.options.itemview) {
      this.itemview = this.name + '-item-view';
    }
    if (this.template) {
      helpers.templatesOption(this.options.directory, this.template, utils.type.compositeview);
      this.templateName = this.template;
    } else {
      this.templateName = this.name;
    }
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('composite-view.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.compositeview)),
      {
        itemview: utils.amd(this.itemview, utils.type.itemview),
        template: utils.templateNameWithPath(this.options.directory, this.name, utils.type.compositeview)
      });
    if (!this.template) {
      this.fs.copyTpl(
        this.templatePath('composite-view.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.compositeview))
      );
    }
    if (!this.options.itemview) {
      this.composeWith('aowp-marionette:itemview', {options: {directory: this.options.directory}, args: [this.name]});
    }

    this.fs.copyTpl(
      this.templatePath('composite-view-test.js'),
      this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.compositeview)),
      {
        compview: utils.amd(this.name, utils.type.compositeview),
        viewName: utils.className(this.name, utils.type.compositeview)
      }
    );
  }
});
