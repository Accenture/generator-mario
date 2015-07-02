'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');

module.exports = DirBase.extend({
  constructor: function (/*args, options*/) {
    DirBase.apply(this, arguments);
    this.option('template', {alias:'t', desc: 'specify a template to use in the layout view'});
  },
  initializing: function () {
    this.options.template = this.options.template || this.options.t;

    if(this.options.template) {
      this.templateName = this.options.template;
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

    if(! this.options.template) {
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
