'use strict';

var existingConfigPrompt = function () {
  var done = this.async();
  if (this.config.get('config')) {
    this.prompt([{
      type: 'confirm',
      name: 'existingConfig',
      message: 'Existing .yo-rc configuration found, would you like to use it?',
      default: true
    }], function(answers) {
      this.existingConfig = answers.existingConfig;
      done();
    }.bind(this));
  }
  else {
    done();
  }
};

module.exports = existingConfigPrompt;