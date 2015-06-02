'use strict';

var yeoman = require('yeoman-generator');
var path = require('path');

var data = {};
data.modelNameCamelCase = '';
data.modelPath = '';
data.collectionName = '';
data.collectionPath = '';
data.collectionNameCamelCase = '';
data.featureDirectory = '';
data.baseDir = 'app/scripts/apps';

module.exports = yeoman.generators.NamedBase.extend({

  constructor: function () {
    yeoman.generators.NamedBase.apply(this, arguments);

    this.option('directory', {desc: 'create model within specified directory'});
    this.option('model', {desc: 'specify a model name to use with the collection (they have to be in the same directory)'});
  },

  initializing: function () {
    //check for directory option
    if(!this.options.directory) {
      this.log.error('Directory Flag is required exiting!');
      process.exit(1);
    }

    data.featureDirectory = this.options.directory;

    data.collectionName = this.name;
    data.collectionPath ='./' + this.name + '-collection';
    data.collectionNameCamelCase = this._.capitalize(this._.camelize(this.name + '-collection'));

    //check for model option
    if(this.options.model) {
      data.modelPath = './' + this.options.model + '-model';
      data.modelNameCamelCase = this._.capitalize(this._.camelize(this.options.model + '-model'));
    } else {
      data.modelPath = './' + data.collectionName + '-model';
      data.modelNameCamelCase = this._.capitalize(this._.camelize(data.collectionName + '-model'));

      this.composeWith('aowp-marionette:model', {options: {directory: data.featureDirectory}, args: [data.collectionName]});
    }
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_template-collection.js'),
      this.destinationPath(
        path.join(data.baseDir, data.featureDirectory, data.collectionName + '-collection.js')),
      data
    );

    this.fs.copyTpl(
      this.templatePath('_template-collection-test.js'),
      this.destinationPath(path.join(data.baseDir, data.featureDirectory, data.collectionName + '-collection-test.js')),
      data
    );
  }

});
