'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');

module.exports = DirBase.extend({
  initializing: function () {
      this.utils = new utils.Utils();
      if (this.options.tests === 'separate') {
        this.utils.testBaseDir = 'test/apps';
      }
    },
  writing: function () {
    var ecma = this.options.ecma;
    var sourceDir = 'es5/';
    if (ecma === 6) {
        sourceDir = 'es6/';
    }
    this.fs.copyTpl(
      this.templatePath(sourceDir + '_model.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.model))
    );

    this.fs.copyTpl(
      this.templatePath(sourceDir + '_model-test.js'),
      this.destinationPath(this.utils.testNameWithPath(this.options.directory, this.name, utils.type.model)),
      {
        modelPath: utils.amd(this.name, utils.type.model, this.options.directory),
        modelName: utils.className(this.name, utils.type.model)
      }
    );
  }
});
