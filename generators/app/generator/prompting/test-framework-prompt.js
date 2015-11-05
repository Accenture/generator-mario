'use strict';

var lodash = require('lodash');

module.exports = function(Generator) {

  Generator.prototype.testFrameworkPrompt = function() {
    if (this.useExistingConfig && this.preferences.testFramework) {
      return;
    }

    var done = this.async();
    this.prompt({
      type: 'list',
      name: 'testFramework',
      message: 'Which test framework would you like to use?',
      choices: [
        { name: 'Mocha + Chai + Sinon', value: 'mocha' },
        { name: 'Jasmine', value: 'jasmine' }
      ],
      default: 'mocha'
    }, function(answer) {
      lodash.merge(this.preferences, answer);

      done();
    }.bind(this));
  };
};
