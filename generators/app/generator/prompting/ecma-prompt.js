'use strict';

var lodash = require('lodash');

module.exports = function(Generator) {

  Generator.prototype.ecmaPrompt = function() {
    if (this.useExistingConfig && this.preferences.ecma) {
      return;
    }

    var done = this.async();
    this.prompt({
      type: 'list',
      name: 'ecma',
      message: 'Which version of ECMAScript Standard would you like to use?',
      choices: [
        { name: 'ECMAScript 5 (ES5)', value: 5 },
        { name: 'ECMAScript 2015 (ES6)', value: 6 }
      ],
      default: 5
    }, function(answer) {
      lodash.merge(this.preferences, answer);

      done();
    }.bind(this));
  };
};
