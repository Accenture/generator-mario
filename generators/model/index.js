'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');

module.exports = DirBase.extend({
  initializing: function() {
    DirBase.prototype.initializing.call(this);
  },
  writing: function() {
    this.fs.copyTpl(
      this.templatePath(this.sourceDir + '_model.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.model))
    );

    this.fs.copyTpl(
      this.templatePath(this.sourceDir + '_model-test.js'),
      this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.model, this.testBaseDir)),
      {
        modelPath: utils.amd(this.name, utils.type.model, this.options.directory),
        modelName: utils.className(this.name, utils.type.model)
      }
    );
  }
});
