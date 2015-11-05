'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');
var path = require('path');
var model = {};
model.className = '';
model.path = '';

module.exports = DirBase.extend({
  constructor: function() {
    DirBase.apply(this, arguments);
    this.option('model', {alias: 'm', desc: 'specify a model name to use with the collection (they have to be in the same directory)'});
    this.option('url', {alias: 'u', desc: 'url'});
  },
  initializing: function() {
    // load config
    DirBase.prototype.initializing.call(this);

    this.options.model = this.options.model || this.options.m;
    //check for model option
    if (this.options.model) {
      this.options.model = utils.truncateBasePath(this.options.model);

      var pathFractions = path.parse(this.options.model);
      utils.verifyPath(utils.fileNameWithPath(pathFractions.dir, pathFractions.name, utils.type.model));

      model.path = utils.amd(pathFractions.name, utils.type.model, pathFractions.dir);
      model.className = utils.className(pathFractions.name, utils.type.model);
    } else {
      model.path = utils.amd(this.name, utils.type.model);
      model.className = utils.className(this.name, utils.type.model);
      this.composeWith('mario:model', {options: {directory: this.options.directory}, args: [this.name]});
    }
  },
  writing: function() {
    this.fs.copyTpl(
      this.templatePath(this.sourceDir + '_collection.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory , this.name, utils.type.collection)),
      {
        modelPath: model.path,
        modelNameCamelCase: model.className,
        url: this.options.url
      }
    );

    this.fs.copyTpl(
      this.templatePath(this.sourceDir + '_collection-test.js'),
      this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.collection, this.testBaseDir)),
      {
        collectionPath: utils.amd(this.name, utils.type.collection, this.options.directory),
        collectionNameCamelCase: utils.className(this.name, utils.type.collection),
        assert: utils.assert[this.testFramework]
      }
    );
  }
});
