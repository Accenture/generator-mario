'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');
var path = require('path');

var items = [];

module.exports = DirBase.extend({
  constructor: function() {
    DirBase.apply(this, arguments);
    this.option('itemview', {alias: 'itv', desc: 'create itemview'});
    this.option('collectionview', {alias: 'clv', desc: 'create collectionview'});
    this.option('compositeview', {alias: 'cmv', desc: 'create '});
    this.option('model', {alias: 'm', desc: 'create '});
    this.option('collection', {alias: 'c', desc: 'create '});
    this.option('skipcheck', {alias: 'f', desc: 'Force to ignore (turn off) checking of paths to referenced files'});
  },
  initializing: function() {
    // load config
    DirBase.prototype.initializing.call(this);

    this.directory = this.options.directory || this.options.d;
    this.itemview = this.options.itemview || this.options.itv;
    this.collectionview = this.options.collectionview || this.options.clv;
    this.compositeview = this.options.compositeview || this.options.cmv;
    this.model = this.options.model || this.options.m;
    this.collection = this.options.collection || this.options.c;

    if (this.model && (!this.itemview && !this.compositeview)) {
      console.log('You need to specify a proper view to display your model');
      process.exit(1);
    }

    if (this.collection && (!this.collectionview && !this.compositeview)) {
      console.log('You need to specify a proper view to display your collection');
      process.exit(1);
    }

    if (!this.model) {
      if (this.itemview) {
        console.log('You need a model for your itemview');
        process.exit(1);
      }
      if (this.compositeview) {
        console.log('You need a model for your compositeview');
        process.exit(1);
      }
    }

    if (!this.collection) {
      if (this.compositeview) {
        console.log('You need a collection for your compositeview.');
        process.exit(1);
      }
      if (this.collectionview) {
        console.log('You need a collection for your collectionview.');
        process.exit(1);
      }
    }

    if (this.model) {
      this.model = utils.truncateBasePath(this.model);

      var mdlPathFractions = path.parse(this.model);
      this.customMdlName = mdlPathFractions.base;
      this.customMdlDir = mdlPathFractions.dir;

      if (!this.options.skipcheck) {
        utils.verifyPath(utils.fileNameWithPath(this.customMdlDir, mdlPathFractions.name, utils.type.model));
      }

      items.push({path: utils.amd(mdlPathFractions.name, utils.type.model, mdlPathFractions.dir), name: 'Model', type: 'model'});
    }

    if (this.collection) {
      this.collection = utils.truncateBasePath(this.collection);

      var cllPathFractions = path.parse(this.collection);
      this.customCllName = cllPathFractions.base;
      this.customCllDir = cllPathFractions.dir;

      if (!this.options.skipcheck) {
        utils.verifyPath(utils.fileNameWithPath(this.customCllDir, cllPathFractions.name, utils.type.collection));
      }
      items.push({path: utils.amd(cllPathFractions.name, utils.type.collection, cllPathFractions.dir), name: 'Collection', type: 'collection'});
    }

    if (this.itemview) {
      this.itemview = utils.truncateBasePath(this.itemview);

      var itvPathFractions = path.parse(this.itemview);
      this.customCllName = itvPathFractions.base;
      this.customItvDir = itvPathFractions.dir;

      if (!this.options.skipcheck) {
        utils.verifyPath(utils.fileNameWithPath(this.customItvDir, itvPathFractions.name, utils.type.itemview));
      }

      var itvName = utils.className(itvPathFractions.name, utils.type.itemview);
      items.push({path: utils.amd(itvPathFractions.name, utils.type.itemview, itvPathFractions.dir), name: itvName, varName: utils.varName(itvName), type: 'itemview'});

      // if itemview is present, ignore all other
      return;
    }

    if (this.collectionview) {
      this.collectionview = utils.truncateBasePath(this.collectionview);

      var clvPathFractions = path.parse(this.collectionview);
      this.customClvName = clvPathFractions.base;
      this.customClvDir = clvPathFractions.dir;

      if (!this.options.skipcheck) {
        utils.verifyPath(utils.fileNameWithPath(this.customClvDir, clvPathFractions.name, utils.type.collectionview));
      }

      var clvName = utils.className(clvPathFractions.name, utils.type.collectionview);
      items.push({path: utils.amd(clvPathFractions.name, utils.type.collectionview, clvPathFractions.dir), name: clvName, varName: utils.varName(clvName), type: 'collectionview'});

      // if collectionview is present, ignore all other
      return;
    }

    if (this.compositeview) {
      this.compositeview = utils.truncateBasePath(this.compositeview);

      var cmvPathFractions = path.parse(this.compositeview);
      this.customCmvName = cmvPathFractions.base;
      this.customCmvDir = cmvPathFractions.dir;

      if (!this.options.skipcheck) {
        utils.verifyPath(utils.fileNameWithPath(this.customCmvDir, cmvPathFractions.name, utils.type.compositeview));
      }

      var cmvName = utils.className(cmvPathFractions.name, utils.type.compositeview);
      items.push({path: utils.amd(cmvPathFractions.name, utils.type.compositeview, cmvPathFractions.dir), name: cmvName, varName: utils.varName(cmvName), type: 'compositeview'});

      // if compositeview is present, ignore all other
      return;
    }
  },
  writing: function() {
    this.fs.copyTpl(
      this.templatePath(this.sourceDir + '_controller.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.controller)),
      {
        name: utils.fileName(this.name, utils.type.controller),
        items: items
      }
    );

    this.fs.copyTpl(
      this.templatePath(this.sourceDir + '_controller-test.js'),
      this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.controller, this.testBaseDir)),
      {
        controllerPath: utils.amd(this.name, utils.type.controller, this.options.directory),
        controllerClassName: utils.className(this.name, utils.type.controller)
      }
    );

  }
});
