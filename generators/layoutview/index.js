'use strict';

var generators = require('yeoman-generator');

var path = require('path');

module.exports = generators.NamedBase.extend({
  constructor: function (/*args, options*/) {
    generators.generators.NamedBase.apply(this, arguments);
    this.option('directory', {desc: 'create layout view within specified directory'});
    this.option('template', {desc: 'specify a template to use in the layout view'});
  },
  initializing: function () {
    if (!this.options.directory) {
      this.log.error('--directory option is required!');
      process.exit(1);
    }

    this.templateName = this.options.template + '.hbs' || this.name + '-template.hbs';
  },
  writing: function () {
    var baseDir = 'app/scripts/apps/';

    this.fs.copyTpl(
      this.templatePath('layout-view.js'),
      this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-layout-view.js')),
      {templatePath: baseDir + this.options.directory + '/' + this.templateName}
    );

    if(! this.options.template) {
      this.fs.copyTpl(
        this.templatePath('template.hbs'),
        this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-template.hbs')),
        {title: this.name}
      );
    }

    this.fs.copyTpl(
      this.templatePath('layout-view-test.js'),
      this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-layout-view-test.js')),
      {
        viewPath: './' + this.name + '-layout-view',
        viewName: this._.capitalize(this._.camelize(this.name) + 'LayoutView')
      }
    );
  }
});
