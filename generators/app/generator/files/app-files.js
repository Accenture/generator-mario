'use strict';

//build system/task automation tool
function copyBuildSystem(generator) {
  if (generator.useGrunt) {
    generator.fs.copy(
      generator.templatePath('common/grunt-tasks'),
      generator.destinationPath('grunt-tasks')
    );

    generator.fs.copy(
      generator.templatePath('common/Gruntfile.js'),
      generator.destinationPath('Gruntfile.js')
    );
  }

  generator.fs.copyTpl(
      generator.templatePath('common/_karma.conf.js'),
      generator.destinationPath('karma.conf.js'),
      {options: generator.answers}
  );

  if (!generator.useWebpack) {
    generator.fs.copyTpl(
        generator.templatePath('common/test/karma-test-main.js'),
        generator.destinationPath('test/karma-test-main.js'),
        {options: generator.answers}
    );
  }

  //rewrite some es6 specific files if es6 is the way
  if (generator.ecma === 6) {
    generator.fs.copy(
      generator.templatePath('es6/grunt-tasks'),
      generator.destinationPath('grunt-tasks')
    );
  }

  if (generator.useWebpack) {
    generator.fs.copy(
      generator.templatePath('webpack'),
      generator.destinationPath()
    );

    generator.fs.copyTpl(
      generator.templatePath('webpack/package.json'),
      generator.destinationPath('package.json'),
      {appName: generator.projectName}
    );
  }

  if (generator.useGulp) {
    generator.fs.copy(
      generator.templatePath('gulp/Gulpfile.js'),
      generator.destinationPath('Gulpfile.js')
    );

    generator.fs.copyTpl(
      generator.templatePath('gulp/package.json'),
      generator.destinationPath('package.json'),
      {appName: generator.projectName}
    );
  }
}

function copyTests(generator) {
  var prefix = (generator.ecma === 6) ? 'es6/' : 'es5/';

  var tests = [
    'apps/home/home-item-view-test.js',
    'apps/home/home-model-test.js',
    'apps/home/home-controller-test.js',
    'apps/navigation/navigation-item-view-test.js',
    'apps/navigation/navigation-controller-test.js'
  ];

  generator.log('-------------------------------------');
  generator.log('Writing tests');
  var destPrefix = (generator.tests === 'separate' ?  'test/' : 'app/scripts/');
  tests.forEach(function(name) {
    generator.fs.copy(
      generator.templatePath(prefix + 'test/' + name),
      generator.destinationPath(destPrefix + name)
    );
  }, generator);
}

var appFiles = function() {
    var templates = ['.jsbeautifyrc', '.bowerrc',
        'app/images', 'app/jsondata', 'app/styles', 'app/.htaccess', 'app/404.html', 'app/favicon.ico',
        'app/index.html','app/.htaccess', 'app/robots.txt', 'app/scripts/main.js'];

    templates.forEach(function(name) {
        this.fs.copy(
            this.templatePath('common/' + name),
            this.destinationPath(name)
        );
    }, this);

    this.fs.copyTpl(
        this.templatePath('common/_bower.json'),
        this.destinationPath('bower.json'),
        {appName: this.projectName}
    );

    this.fs.copyTpl(
        this.templatePath('common/_package.json'),
        this.destinationPath('package.json'),
        {
            appName: this.projectName,
            options: this.answers
        }
    );

    //copy files for selected build system
    copyBuildSystem(this);

    var prefix = (this.ecma === 6) ? 'es6/' : 'es5/';
    var esmaSpecificTemplates = ['app/scripts'];

    esmaSpecificTemplates.forEach(function(name) {
        this.fs.copy(
          this.templatePath(prefix + name),
          this.destinationPath(name)
        );

    }, this);

    //copy tests to specified folder
    copyTests(this);

    if (this.phabricatorDeps) {
        this.fs.copy(
            this.templatePath('common/.arclint'),
            this.destinationPath('.arclint')
        );
        this.fs.copyTpl(
            this.templatePath('common/_.arcconfig'),
            this.destinationPath('.arcconfig'),
            {ip: this.phabricatorIP, appName: this.projectName}
        );
    }
};

module.exports = appFiles;
