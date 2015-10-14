'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');
var path = require('path');

module.exports = DirBase.extend({
  constructor: function(/*args, options*/) {
    DirBase.apply(this, arguments);
    this.option('template', {alias: 't', desc: 'specify a template to use in the layout view'});
  },
  initializing: function() {
    // load config
    DirBase.prototype.initializing.call(this);

    this.template = this.options.template || this.options.t;
    this.customTplDir = this.options.directory || this.name;
    this.customTplName = this.name;
    this.templateExists = false;

    if (this.template) {
      this.templateExists = true;
      this.template = utils.truncateBasePath(this.template);

      var pathFractions = path.parse(this.template);
      this.customTplName = pathFractions.base;
      if (pathFractions.dir) {
         this.customTplDir = pathFractions.dir;
      }

      utils.verifyPath(utils.templateNameWithPath(pathFractions.dir, pathFractions.name, utils.type.layoutview));
    }
  },
  writing: function() {
    this.fs.copyTpl(
      this.templatePath(this.sourceDir + '_layout-view.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.layoutview)),
      {
        templatePath: utils.templateNameWithPath(this.customTplDir, this.customTplName, utils.type.layoutview),
        templateExists: this.templateExists
      }
    );

    if (!this.template) {
      this.fs.copyTpl(
        this.templatePath('_template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.layoutview)),
        {
          title: this.name
        }
      );
    }

    this.fs.copyTpl(
      this.templatePath(this.sourceDir + '_layout-view-test.js'),
      this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.layoutview, this.testBaseDir)),
      {
        viewPath: utils.amd(this.name, utils.type.layoutview, this.options.directory),
        viewName: utils.className(this.name, utils.type.layoutview),
        templateExists: this.templateExists
      }
    );
  }
});
