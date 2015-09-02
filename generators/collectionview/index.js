'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');
var pathVerification = require('../path-verification');
var path = require('path');
var itemview = {};
itemview.path = '';
itemview.class = '';

module.exports = DirBase.extend({
  constructor: function(/*args, options*/) {
    DirBase.apply(this, arguments);
    this.option('itemview', {alias: 'itv', desc: 'specify a item view to use with the collection view (they have to be in the same directory)'});
  },
  initializing: function() {
    this.options.itemview = this.options.itemview || this.options.itv;

    if (this.options.itemview) {
      this.options.itemview = utils.truncateBasePath(this.options.itemview);
      var pathFractions = path.parse(this.options.itemview);
      var customViewName = pathFractions.name;
      var customViewDir = pathFractions.dir;

      pathVerification.verifyPath(pathFractions.dir, pathFractions.name, utils.type.itemview);

      itemview.path = utils.amd(customViewName, utils.type.itemview, customViewDir);
      itemview.class = utils.className(customViewName, utils.type.itemview);
    } else {
      itemview.path = utils.amd(this.name, utils.type.itemview);
      itemview.class = utils.className(this.name, utils.type.itemview);
    }
    this.utils = new utils.Utils();
    if (this.options.tests === 'separate') {
      this.utils.testBaseDir = 'test/apps';
    }
  },
  writing: function() {
    if (!this.options.itemview) {
      this.composeWith('aowp-marionette:itemview', {options: {directory: this.options.directory}, args: [this.name]});
    }
    var ecma = this.options.ecma;
    var sourceDir = 'es5/';
    if (ecma === 6) {
      sourceDir = 'es6/';
    }

    this.fs.copyTpl(
      this.templatePath(sourceDir + '_collection-view.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.collectionview)),
      {
        childPath: itemview.path,
        childItemView: itemview.class
      }
    );
    this.fs.copyTpl(
      this.templatePath(sourceDir + '_collection-view-test.js'),
      this.destinationPath(this.utils.testNameWithPath(this.options.directory, this.name, utils.type.collectionview)),
      {
        viewPath: utils.amd(this.name, utils.type.collectionview, this.options.directory),
        viewName: utils.className(this.name, utils.type.collectionview)
      }
    );
  }
});
