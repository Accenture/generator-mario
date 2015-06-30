'use strict';
var utils = require('../utils');
var DirBase = require('../dir-base');

module.exports = DirBase.extend({
  constructor: function (/*args, options*/) {
    DirBase.apply(this, arguments);
    this.option('controller', {desc: 'specify a controller name to use with the router (they have to be in the same directory)'});
  },
  initializing: function () {
    if(!this.options.controller) {
      this.composeWith('aowp-marionette:controller', {options: {directory: this.options.directory}, args: [this.name]});
      this.controllerNameSpinal = this.name;
    } else {
      this.controllerNameSpinal = this.options.controller;
    }
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('router.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.router)),
      {
        name: this.name,
        controllerPath: utils.amd(this.controllerNameSpinal, utils.type.controller),
        controllerName: utils.className(this.controllerNameSpinal, utils.type.controller)
      }
    );
  }
});
