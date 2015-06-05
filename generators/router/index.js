'use strict';

var generators = require('yeoman-generator');
var path = require('path');

module.exports = generators.NamedBase.extend({
  constructor: function (/*args, options*/) {
    generators.generators.NamedBase.apply(this, arguments);
    this.option('directory', {desc: 'create model within specified directory'});
    this.option('controller', {desc: 'specify a controller name to use with the router (they have to be in the same directory)'});
  },
  initializing: function () {
    if(!this.options.directory) {
      this.log.error('Directory Flag is required exiting!');
      process.exit(1);
    }

    if(!this.options.controller) {
      this.composeWith('aowp-marionette:controller', {options: {directory: this.options.directory}, args: [this.name]});
      this.controllerNameSpinal = this.name + '-controller';
    } else {
      this.controllerNameSpinal = this.options.controller;
    }
  },
  writing: function () {
    var baseDir = 'app/scripts/apps';

    this.fs.copyTpl(
      this.templatePath('router.js'),
      this.destinationPath(
        path.join(baseDir, this.options.directory, this.name + '-router.js')
      ),
      {
        name: this.name,
        controllerPath: './' + this.controllerNameSpinal,
        controllerName: this._.camelize(this.controllerNameSpinal)
      }
    );
  }
});
