'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var options ={};

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the' + chalk.red('Aowp Marionette') + ' generator!'
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

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
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
