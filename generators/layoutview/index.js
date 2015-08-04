'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');
var pathVerification = require('../path-verification');
var path = require('path');

module.exports = DirBase.extend({
  constructor: function (/*args, options*/) {
    DirBase.apply(this, arguments);
    this.option('template', {alias: 't', desc: 'specify a template to use in the layout view'});
  },
  initializing: function () {
    this.template = this.options.template || this.options.t;
    this.customTplDir = this.options.directory || this.name;
    this.customTplName = this.name;

    if (this.template) {
      this.template = utils.truncateBasePath(this.template);

      var pathFractions = path.parse(this.template);
      this.customTplName = pathFractions.base;
      if(pathFractions.dir) {
         this.customTplDir = pathFractions.dir;
      }

      pathVerification.verifyPath(pathFractions.dir, pathFractions.name, utils.type.template);
    }
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('layout-view.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.layoutview)),
      {
        templatePath: utils.templateNameWithPath(this.customTplDir, this.customTplName, utils.type.layoutview)
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
