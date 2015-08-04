'use strict';
var utils = require('../utils');
var DirBase = require('../dir-base');
var pathVerification = require('../path-verification');
var path = require('path');

module.exports = DirBase.extend({
  constructor: function () {
    DirBase.apply(this, arguments);
    this.option('template', {alias: 't', desc: 'reuse existing template for item view'});
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

      pathVerification.verifyPath(this.customTplDir, pathFractions.name, utils.type.template);
    }
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('item-view.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.itemview)),
      {dest: utils.templateNameWithPath(this.customTplDir, this.customTplName, utils.type.itemview)}
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
