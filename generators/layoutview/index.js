'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');
var helpers = require('../helpers');

module.exports = DirBase.extend({
  constructor: function (/*args, options*/) {
    DirBase.apply(this, arguments);
    this.option('template', {alias: 't', desc: 'specify a template to use in the layout view'});
  },
  initializing: function () {
    this.template = this.options.template || this.options.t;
    if (this.template) {
      helpers.templatesOption(this.options.directory, this.template, utils.type.layoutview);
      this.templateName = this.template;
    } else {
      this.templateName = this.name;
    }
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('layout-view.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.layoutview)),
      {
        templatePath: utils.templateNameWithPath(this.options.directory, this.templateName, utils.type.layoutview)
      }
    );

    if (!this.template) {
      this.fs.copyTpl(
        this.templatePath('template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.layoutview)),
        {
          title: this.name
        }
      );
    }

    this.fs.copyTpl(
      this.templatePath('layout-view-test.js'),
      this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.layoutview)),
      {
        viewPath: utils.amd(this.name, utils.type.layoutview),
        viewName: utils.className(this.name, utils.type.layoutview)
      }
    );
  }
});
