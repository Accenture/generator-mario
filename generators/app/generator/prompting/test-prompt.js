'use strict';

module.exports = function(Generator) {

  Generator.prototype.testPrompt = function() {
    var done = this.async();
    this.prompt({
      type: 'list',
      name: 'tests',
      message: 'Where would you like to store your test files?',
      choices: [
        { name: 'With my app code', value: 'appcode' },
        { name: 'Separately', value: 'separate' }
      ]
    }, function(answer) {
      this._.merge(this.preferences, answer);

      done();
    }.bind(this));
  };
};
