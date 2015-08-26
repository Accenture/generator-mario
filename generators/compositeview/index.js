'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');
var path = require('path');
var pathVerification = require('../path-verification');
var itemview = {};
itemview.path = '';
itemview.class = '';

module.exports = DirBase.extend({
  constructor: function (/*args, options*/) {
    DirBase.apply(this, arguments);
    this.option('itemview', {alias: 'itv', desc: 'creates itemView within specified directory'});
    this.option('template', {alias: 't', desc: 'reuse existing template for composite view'});
  },
  initializing: function () {
    this.itemview = this.options.itemview || this.options.itv;
    this.template = this.options.template || this.options.t;

    //item view
    this.customView = {
      path: '',
      class: ''
    };

    var pathFractions = {};

    if (this.itemview) {
      this.itemview = utils.truncateBasePath(this.itemview);
      pathFractions = path.parse(this.itemview);
      var customViewName = pathFractions.name;
      var customViewDir = pathFractions.dir;

      pathVerification.verifyPath(pathFractions.dir, pathFractions.name, utils.type.itemview);

      this.customView.path = utils.amd(customViewName, utils.type.itemview, customViewDir);
      this.customView.class = utils.className(customViewName, utils.type.itemview);
    } else {
      this.customView.path = utils.amd(this.name, utils.type.itemview);
      this.customView.class = utils.className(this.name, utils.type.itemview);
    }

    //template
    this.customTplDir = this.options.directory || this.name;
    this.customTplName = this.name;

    if (this.template) {
      this.template = utils.truncateBasePath(this.template);

      pathFractions = path.parse(this.template);
      this.customTplName = pathFractions.base;

      if(pathFractions.dir) {
         this.customTplDir = pathFractions.dir;
      }

      pathVerification.verifyPath(this.options.directory, this.template, utils.type.template);
    }
    this.utils = new utils.Utils();
    if (this.options.tests === 'separate') {
      this.utils.testBaseDir = 'test/apps';
    }
  },

  writing: function () {
    var ecma = this.config.get('ecma');
    var sourceDir = 'es5/';
    if (ecma === 6) {
      sourceDir = 'es6/';
    }
    this.fs.copyTpl(
      this.templatePath(sourceDir + '_composite-view.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.compositeview)),
      {
        childPath: this.customView.path,
        childItemView: this.customView.class,
        template: utils.templateNameWithPath(this.customTplDir, this.customTplName, utils.type.compositeview)
      }
    );

    if (!this.template) {
      this.fs.copyTpl(
        this.templatePath('_composite-view-template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.compositeview))
      );
    }

    if (!this.itemview) {
      this.composeWith('aowp-marionette:itemview', {options: {directory: this.options.directory}, args: [this.name]});
    }

    this.fs.copyTpl(
      this.templatePath(sourceDir + '_composite-view-test.js'),
      this.destinationPath(this.utils.testNameWithPath(this.options.directory, this.name, utils.type.compositeview)),
      {
        compview: utils.amd(this.name, utils.type.compositeview, this.options.directory),
        viewName: utils.className(this.name, utils.type.compositeview)
      }
    );
  }
});
