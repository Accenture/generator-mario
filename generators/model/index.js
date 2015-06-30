'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');

module.exports = DirBase.extend({
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('model.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.model))
    );

    this.fs.copyTpl(
      this.templatePath('model-test.js'),
      this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.model)),
      {
        modelPath: utils.amd(this.name, utils.type.model),
        modelName: utils.className(this.name, utils.type.model)
      }
    );
  }
});
