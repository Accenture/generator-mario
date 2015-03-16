'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var options ={};

options.foundation = false;
options.bootstrap = false;

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  initPrompt: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the ' + chalk.red('AOWP Marionette') + ' generator!'
    ));

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
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );
      this.fs.copy(
        this.templatePath('_Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
      this.fs.copy(
        this.templatePath('_.jsbeautifyrc'),
        this.destinationPath('.jsbeautifyrc')
      );
      this.fs.copy(
        this.templatePath('_.gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('_.bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('_app'),
        this.destinationPath('app')
      );

      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('app/index.html'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('_mainLayout.hbs'),
        this.destinationPath('app/scripts/apps/mainLayout/mainLayoutList/mainLayout.hbs'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('_main.js'),
        this.destinationPath('app/scripts/main.js'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('_topBarView.js'),
        this.destinationPath('app/scripts/apps/navigation/topBar/topBarView.js'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('_topBarTemp.hbs'),
        this.destinationPath('app/scripts/apps/navigation/topBar/topBarTemp.hbs'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('_technologiesCompositeViewTemp.hbs'),
        this.destinationPath('app/scripts/apps/mainLayout/technologies/technologiesCompositeViewTemp.hbs'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('_technologiesItemView.js'),
        this.destinationPath('app/scripts/apps/mainLayout/technologies/technologiesItemView.js'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      this.fs.copyTpl(
        this.templatePath('_technologiesItemViewTemp.hbs'),
        this.destinationPath('app/scripts/apps/mainLayout/technologies/technologiesItemViewTemp.hbs'),
        {foundation:options.foundation, bootstrap:options.bootstrap}
      );

      if(options.phabricatorDeps){
        this.fs.copy(
          this.templatePath('_.arclint'),
          this.destinationPath('.arclint')
        );
        this.fs.copyTpl(
          this.templatePath('_.arcconfig'),
          this.destinationPath('.arcconfig'),
          {ip: options.phabricatorIP}
        );
      }

    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('_.editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('_.jshintrc'),
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
