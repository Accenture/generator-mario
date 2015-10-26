'use strict';

var utils = require('../../../utils');
var fs = require('fs');

//build system/task automation tool
function copyBuildSystem(generator) {
  generator.preferences.escapedTestFolder =
    utils.escapePathForRegex(generator.preferences.testFolder);

  if (generator.preferences.buildTool === 'grunt') {
    generator.fs.copy(
      generator.templatePath('common/Gruntfile.js'),
      generator.destinationPath('Gruntfile.js')
    );

    var dirConfig = fs.readdirSync(generator.templatePath('common/grunt-tasks/config'));

    // pick config  static files and copy them
    var filesConfig = dirConfig.filter(function(file) { return file.indexOf('_') !== 0; });

    filesConfig.forEach(function(file) {
      generator.fs.copy(
        generator.templatePath('common/grunt-tasks/config/' + file),
        generator.destinationPath('grunt-tasks/config/' + file)
      );
    });

    //pick config tempaltes and copy them
    var templates = dirConfig
      .filter(function(file) { return file.indexOf('_') === 0; })
      .map(function(file) { return file.slice(1); });

    templates.forEach(function(template) {
      generator.fs.copyTpl(
        generator.templatePath('common/grunt-tasks/config/_' + template),
        generator.destinationPath('grunt-tasks/config/' + template),
        generator.preferences
      );
    });

    var dirRegister = fs.readdirSync(generator.templatePath('common/grunt-tasks/register'));
    var fileRegister = dirRegister.filter(function(file) { return file.indexOf('_') !== 0; });
    fileRegister.forEach(function(file) {
      generator.fs.copy(
        generator.templatePath('common/grunt-tasks/register/' + file),
        generator.destinationPath('grunt-tasks/register/' + file)
      );
    });

    generator.fs.copyTpl(
      generator.templatePath('common/grunt-tasks/register/_styles.js'),
      generator.destinationPath('grunt-tasks/register/styles.js'),
      generator.preferences
    );

    //rewrite some es6 specific files if es6 is the way
    if (generator.preferences.ecma === 6) {
      generator.fs.copy(
        generator.templatePath('es6/grunt-tasks'),
        generator.destinationPath('grunt-tasks')
      );
    }

    generator.fs.copyTpl(
      generator.templatePath('common/test/_karma-test-main.js'),
      generator.destinationPath('test/karma-test-main.js'),
      generator.preferences
    );
  } else if (generator.preferences.buildTool === 'gulp') {
    generator.fs.copyTpl(
      generator.templatePath('gulp/_Gulpfile.js'),
      generator.destinationPath('Gulpfile.js'),
      generator.preferences
    );

    generator.fs.copyTpl(
      generator.templatePath('common/test/_karma-test-main.js'),
      generator.destinationPath('test/karma-test-main.js'),
      generator.preferences
    );
  } else if (generator.preferences.buildTool === 'webpack') {
    generator.fs.copyTpl(
      generator.templatePath('webpack/app/index.html'),
      generator.destinationPath('app/index.html'),
      generator.preferences
    );

    generator.fs.copyTpl(
      generator.templatePath('webpack/_Gruntfile.js'),
      generator.destinationPath('Gruntfile.js'),
      generator.preferences
    );

    generator.fs.copyTpl(
      generator.templatePath('webpack/_webpack.config.js'),
      generator.destinationPath('webpack.config.js'),
      generator.preferences
    );

    generator.fs.copyTpl(
      generator.templatePath('webpack/app/scripts/_main.js'),
      generator.destinationPath('app/scripts/main.js'),
      generator.preferences
    );
  }
}

function copyTests(generator) {
  var prefix = (generator.preferences.ecma === 6) ? 'es6/' : 'es5/';
  var destPrefix = generator.preferences.testFolder;

  var tests = [
    'apps/home/home-item-view-test.js',
    'apps/home/home-model-test.js',
    'apps/home/home-controller-test.js',
    'apps/navigation/navigation-item-view-test.js',
    'apps/navigation/navigation-controller-test.js'
  ];

  tests.forEach(function(name) {
    generator.fs.copy(
      generator.templatePath(prefix + 'test/' + name),
      generator.destinationPath(destPrefix + name)
    );
  });
}

function copySources(generator) {
  var prefix = (generator.preferences.ecma === 6) ? 'es6/' : 'es5/';
  var scriptsFolder = 'app/scripts';

  generator.fs.copyTpl(
    generator.templatePath(prefix + scriptsFolder),
    generator.destinationPath(scriptsFolder),
    generator.preferences
  );
}

function copyStyles(generator) {
  var styles = generator.preferences.styles || 'less';

  var dir = fs.readdirSync(generator.templatePath('styles/' + styles + '/styles'));
  var templates = dir
    .filter(function(file) { return file.indexOf('_') === 0; })
    .map(function(file) { return file.slice(1); });

  templates.forEach(function(file) {
    generator.fs.copyTpl(
      generator.templatePath('styles/' + styles + '/styles/_' + file),
      generator.destinationPath('app/styles/' + file),
      generator.preferences
    );
  });

  var files = dir.filter(function(file) { return file.indexOf('_') !== 0; });

  files.forEach(function(file) {
    generator.fs.copy(
      generator.templatePath('styles/' + styles + '/styles/' + file),
      generator.destinationPath('app/styles/' + file)
    );
  });
}

function copySkeleton(generator) {
  var staticFiles = ['.jsbeautifyrc', '.bowerrc', 'app/images', 'app/jsondata', 'app/locales',
  'app/404.html', 'app/favicon.ico', 'app/index.html', 'app/.htaccess',
  'app/robots.txt', 'environment.json'];

  var templates = ['bower.json', 'package.json', 'karma.conf.js'];

  staticFiles.forEach(function(name) {
    generator.fs.copy(
      generator.templatePath('common/' + name),
      generator.destinationPath(name)
    );
  });

  templates.forEach(function(name) {
    generator.fs.copyTpl(
      generator.templatePath('common/_' + name),
      generator.destinationPath(name),
      generator.preferences
    );
  });
}

module.exports = function(Generator) {

  Generator.prototype.appFiles = function() {
    copySkeleton(this);
    copySources(this);
    copyTests(this);
    copyStyles(this);
    copyBuildSystem(this);
  };
};
