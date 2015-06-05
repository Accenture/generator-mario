'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var options ={};

options.foundation = false;
options.bootstrap = false;
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

      if(answer.phabricatorDeps){
        this.prompt({
          type: 'input',
          name: 'phabricatorIP',
          message: 'What is IP address of your Phabricator server?',
          default: '127.0.0.1'
        }, function(answer){
          options.phabricatorIP = answer.phabricatorIP;
          done();
        });
      }else{
        done();
      }

    }.bind(this));
  },
  frameworksPrompt:function(){
    var done = this.async();
    this.prompt({
      type: 'list',
      name: 'cssFramework',
      message: 'Would you like to use ' + chalk.blue('Twitter Bootstrap') + ' or '+ chalk.blue('Zurb Foundation') + ' ?',
      choices: ['Bootstrap','Foundation']
    }, function (answer) {

      if(answer.cssFramework === 'Bootstrap'){
        options.bootstrap = true;
      }else{
        options.foundation = true;
      }

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {appName: options.appName}
      );
      this.fs.copyTpl(
        this.templatePath('bower.json'),
        this.destinationPath('bower.json'),
        {appName: options.appName, foundation:options.foundation, bootstrap:options.bootstrap}
      );
      this.fs.copy(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
      this.fs.copy(
        this.templatePath('karma.conf.js'),
        this.destinationPath('karma.conf.js')
      );
      this.fs.copy(
        this.templatePath('.jsbeautifyrc'),
        this.destinationPath('.jsbeautifyrc')
      );
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('.bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('app'),
        this.destinationPath('app')
      );

      this.fs.copy(
        this.templatePath('test'),
        this.destinationPath('test')
      );

      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('main-layout-template.hbs'),
        this.destinationPath('app/scripts/apps/main-layout/main-layout-list/main-layout-template.hbs'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('main.js'),
        this.destinationPath('app/scripts/main.js'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('top-bar-view.js'),
        this.destinationPath('app/scripts/apps/navigation/top-bar/top-bar-view.js'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('top-bar-template.hbs'),
        this.destinationPath('app/scripts/apps/navigation/top-bar/top-bar-template.hbs'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('technologies-composite-view-template.hbs'),
        this.destinationPath('app/scripts/apps/main-layout/technologies/technologies-composite-view-template.hbs'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('technologies-item-view.js'),
        this.destinationPath('app/scripts/apps/main-layout/technologies/technologies-item-view.js'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('technologies-item-view-template.hbs'),
        this.destinationPath('app/scripts/apps/main-layout/technologies/technologies-item-view-template.hbs'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('mocha-test-main.js'),
        this.destinationPath('test/mocha-test-main.js'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      if(options.phabricatorDeps){
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
      this.fs.copy(
        this.templatePath('.editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('.jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
