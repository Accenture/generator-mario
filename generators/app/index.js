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
      var templates = ['bower.json', '.jsbeautifyrc', '.gitignore', '.bowerrc', 'app', 'test', 'karma.conf.js', 'Gruntfile.js'];

      templates.forEach(function (name) {
        this.fs.copy(
          this.templatePath(name),
          this.destinationPath(name)
        );
      }, this);

      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {appName: options.appName}
      );

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

      if (options.phabricatorDeps) {
        this.fs.copy(
          this.templatePath('.arclint'),
          this.destinationPath('.arclint')
        );
        this.fs.copyTpl(
          this.templatePath('.arcconfig'),
          this.destinationPath('.arcconfig'),
          {ip: options.phabricatorIP}
        );
      }
    },
    projectfiles: function () {
      var templates = ['.editorconfig', '.jshintrc'];

      templates.forEach(function (name) {
        this.fs.copy(
          this.templatePath(name),
          this.destinationPath(name)
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
