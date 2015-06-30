'use strict';
var utils = require('../utils');
var DirBase = require('../dir-base');

module.exports = DirBase.extend({
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.controller)),
      {
        name: utils.fileName(this.name, utils.type.controller)
      }
    );
  }
});
