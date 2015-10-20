'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');
var path = require('path');

module.exports = DirBase.extend({
  constructor: function() {
    DirBase.apply(this, arguments);
    this.option('template', {alias: 't', desc: 'reuse existing template for item view'});
    this.option('skipcheck', {alias: 'f', desc: 'Force to ignore (turn off) checking of existance of referenced template'});
  },
  initializing: function() {
    // load config
    DirBase.prototype.initializing.call(this);

    this.template = this.options.template || this.options.t;
    this.customTplDir = this.options.directory || this.name;
    this.customTplName = this.name;

    if (this.template) {
      this.template = utils.truncateBasePath(this.template);

      var pathFractions = path.parse(this.template);
      this.customTplName = pathFractions.base;

      if (pathFractions.dir) {
         this.customTplDir = pathFractions.dir;
      }
      if (!this.options.skipcheck) {
        utils.verifyPath(utils.templateNameWithPath(this.customTplDir, pathFractions.name, utils.type.itemview));
      }
    }
  },
  writing: function() {
    this.fs.copyTpl(
      this.templatePath(this.sourceDir + '_item-view.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.itemview)),
      {dest: utils.templateNameWithPath(this.customTplDir, this.customTplName, utils.type.itemview)}
    );

    this.fs.copyTpl(
      this.templatePath(this.sourceDir + '_item-view-test.js'),
      this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.itemview, this.testBaseDir)),
      {
        dest: utils.amd(this.name, utils.type.itemview, this.options.directory),
        view: utils.className(this.name, utils.type.itemview),
        template: this.template
      }
    );

    if (!this.template) {
      this.fs.copyTpl(
        this.templatePath('_template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.itemview)),
        {title: this.name}
      );
    }

  }
});
