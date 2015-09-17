'use strict';

var ecmaPrompts = function() {
    if (this.skipEcmaPromp) {
      this.ecmaPrompts = {ecma: 5};

      return;
    }

    var done = this.async();
    this.prompt({
      type: 'list',
      name: 'ecma',
      default: 'ECMAScript 5 (ES5)',
      message: 'Which version of ECMAScript Standard would you like to use?',
      choices: ['ECMAScript 5 (ES5)', 'ECMAScript 2015 (ES6)']
    }, function(answer) {
      if (answer.ecma === 'ECMAScript 5 (ES5)') {
        this.ecmaPrompts = {ecma: 5};
      } else if (answer.ecma === 'ECMAScript 2015 (ES6)') {
        this.ecmaPrompts = {ecma: 6};
      }
      done();
    }.bind(this));
};

module.exports = ecmaPrompts;
