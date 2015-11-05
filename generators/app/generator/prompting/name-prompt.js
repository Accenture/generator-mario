'use strict';

var lodash = require('lodash');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = function(Generator) {

  Generator.prototype.namePrompt = function() {
    if (this.useExistingConfig && this.preferences.projectName) {
      return;
    }

    var done = this.async();

    this.log(yosay(
      'Welcome to the ' + chalk.red('Mario') + ' generator!'
    ));

    this.prompt({
      type: 'input',
      name: 'projectName',
      message: 'How would you like to name your application?',
      default: 'mario-app'
    }, function(answer) {
      lodash.merge(this.preferences, answer);

      done();
    }.bind(this));
  };
};
