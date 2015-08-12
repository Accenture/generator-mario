'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var options = {};
options.appName = 'appName';

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
  },
  initPrompt: function () {
    var done = this.async();
    this.log(yosay(
      'Welcome to the ' + chalk.red('AOWP Marionette') + ' generator!'
    ));
    this.prompt({
      type: 'input',
      name: 'appName',
      message: 'How would you like to name your application?',
      default: 'aowp-marionette-app'
    }, function (answer) {
      this.log(answer.appName);
      options.appName = answer.appName;
      done();
    }.bind(this));
  },
  ecmaPrompt: function() {
    var done = this.async();
    this.prompt({
      type: 'list',
      name: 'ecma',
      default: 0,
      store   : true,
      message: 'Which version of ECMAScript Standard would you like to use?',
      choices: ['ECMAScript 5 (ES5)', 'ECMAScript 2015 (ES6)']
    }, function(answer) {
      if(answer.ecma === 'ECMAScript 5 (ES5)') {
        this.config.set('ecma', 5);
        options.ecma = 'es5';
      } else if(answer.ecma === 'ECMAScript 2015 (ES6)') {
        this.config.set('ecma', 6);
        options.ecma = 'es6';
      }
      done();
    }.bind(this));
  },
  arcanistPrompt: function () {
    var done = this.async();
    this.prompt({
      type: 'confirm',
      name: 'phabricatorDeps',
      message: 'Would you like to include Arcanist config files?',
      default: false
    }, function (answer) {
      options.phabricatorDeps = answer.phabricatorDeps;
      if (answer.phabricatorDeps) {
        this.prompt({
          type: 'input',
          name: 'phabricatorIP',
          message: 'What is IP address of your Phabricator server?',
          default: '127.0.0.1'
        }, function (answer) {
          var url = answer.phabricatorIP;
          if(url.indexOf('http') !== -1){
            options.phabricatorIP = url;
          }else{
            options.phabricatorIP = 'http://' + url;
          }
          done();
        });
      } else {
        done();
      }

    }.bind(this));
  },
  webpackPrompt: function () {
    var done = this.async();
    this.prompt({
      type: 'confirm',
      name: 'useWebpack',
      message: 'Would you like to use Webpack instead of requireJS (experimental)?',
      default: false
    }, function (answer) {
      options.useWebpack = answer.useWebpack;
      done();
    }.bind(this));
  },
  writing: {
    app: function () {
      var templates = ['bower.json', '.jsbeautifyrc', '.bowerrc',
        'app/images', 'app/jsondata', 'app/styles', 'app/.htaccess', 'app/404.html', 'app/favicon.ico',
        'app/index.html','app/.htaccess', 'app/robots.txt', 'app/scripts/main.js'];
      this.fs.copyTpl(
        this.templatePath('common/package.json'),
        this.destinationPath('package.json'),
        {
          appName: options.appName,
          options: options
        }
      );
      templates.forEach(function (name) {
        this.fs.copy(
          this.templatePath('common/' + name),
          this.destinationPath(name)
        );
      }, this);

      if(options.useWebpack) {
        this.fs.copy(
          this.templatePath('webpack'),
          this.destinationPath(),
          {appName: options.appName}
        );

        this.fs.copyTpl(
          this.templatePath('webpack/package.json'),
          this.destinationPath('package.json'),
          {appName: options.appName}
        );
      }

      this.fs.copyTpl(
        this.templatePath('common/karma.conf.js'),
        this.destinationPath('karma.conf.js'),
        {options: options}
      );
      this.fs.copyTpl(
        this.templatePath('common/test/karma-test-main.js'),
        this.destinationPath('test/karma-test-main.js'),
        {options: options}
      );

      var prefix = 'es5/';
      if(options.ecma === 'es6') {
        prefix = 'es6/';
      }
      var esmaSpecificTemplates = ['app/scripts', 'Gruntfile.js'];
      esmaSpecificTemplates.forEach(function (name) {
        this.fs.copy(
          this.templatePath(prefix + name),
          this.destinationPath(name)
        );
      }, this);

      this.fs.copyTpl(
        this.templatePath('common/.arcconfig'),
        this.destinationPath('.arcconfig'),
        {ip: options.phabricatorIP}
      );
      if (options.phabricatorDeps) {
        this.fs.copy(
          this.templatePath('common/.arclint'),
          this.destinationPath('.arclint')
        );
        this.fs.copyTpl(
          this.templatePath('common/.arcconfig'),
          this.destinationPath('.arcconfig'),
          {ip: options.phabricatorIP}
        );
      }

      // rename-copy gitignore manually
      // (.gitignore files get removed upon `npm install`)
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },
    projectfiles: function () {
      var templates = ['.editorconfig', '.jshintrc'];

      templates.forEach(function (name) {
        this.fs.copyTpl(
          this.templatePath('common/' + name),
          this.destinationPath(name),
          {options: options}
        );
      }, this);
    }
  },
  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
