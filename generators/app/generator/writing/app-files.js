'use strict';

//build system/task automation tool
function copyBuildSystem(generator) {
  if (generator.preferences.buildTool === 'grunt') {
    generator.fs.copy(
      generator.templatePath('common/Gruntfile.js'),
      generator.destinationPath('Gruntfile.js')
    );

    generator.fs.copy(
      generator.templatePath('common/grunt-tasks'),
      generator.destinationPath('grunt-tasks')
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
    generator.fs.copy(
      generator.templatePath('gulp/Gulpfile.js'),
      generator.destinationPath('Gulpfile.js')
    );

    generator.fs.copyTpl(
      generator.templatePath('common/test/_karma-test-main.js'),
      generator.destinationPath('test/karma-test-main.js'),
      generator.preferences
    );
  } else if (generator.preferences.buildTool === 'webpack') {
    generator.fs.copy(
      generator.templatePath('webpack'),
      generator.destinationPath()
    );
  }
}

function copyTests(generator) {
  var prefix = (generator.preferences.ecma === 6) ? 'es6/' : 'es5/';
  var destPrefix = (generator.preferences.tests === 'separate' ?  'test/' : 'app/scripts/');

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

  generator.fs.copy(
    generator.templatePath(prefix + scriptsFolder),
    generator.destinationPath(scriptsFolder)
  );
}

function copySkeleton(generator) {
  var staticFiles = ['.jsbeautifyrc', '.bowerrc', 'app/images', 'app/jsondata',
  'app/styles', 'app/.htaccess', 'app/404.html', 'app/favicon.ico',
  'app/index.html','app/.htaccess', 'app/robots.txt'];

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
    copyBuildSystem(this);
  };
};
