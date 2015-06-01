'use strict';

var generators = require('yeoman-generator');

var path = require('path');

module.exports = generators.NamedBase.extend({
  constructor: function (/*args, options*/) {
    generators.generators.NamedBase.apply(this, arguments);
  },
  initializing: function () {
    this.option('directory', {desc: 'create model within specified directory'});
  },
  writing: function () {
    if (this.options.directory) {
      var baseDir = 'app/scripts/apps/';
      this.fs.copyTpl(
        this.templatePath('model.js'),
        this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-model.js')));

      this.fs.copyTpl(
        this.templatePath('model-test.js'),
        this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-model-test.js')),
        {modelPath: './' + this.name + '-model', modelName: this._.capitalize(this._.camelize(this.name + 'Model'))}
      );
    }
  }
});
