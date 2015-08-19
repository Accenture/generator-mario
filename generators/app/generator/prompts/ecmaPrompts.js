'use strict';

var ecmaPrompts = function (){
    if(this.skipEcmaPromp) {
      return;
    }

    var done = this.async();
    this.prompt({
      type: 'list',
      name: 'ecma',
      default: 0,
      store   : true,
      message: 'Which version of ECMAScript Standard would you like to use?',
      choices: ['ECMAScript 5 (ES5)', 'ECMAScript 2015 (ES6)']
    }, function(answer) {
      if(answer.ecma === 'ECMAScript 5 (ES5)') {
        this.config.set('ecma', 5);
        this.ecmaPrompts = {ecma: 'es5'};
      } else if(answer.ecma === 'ECMAScript 2015 (ES6)') {
        this.config.set('ecma', 6);
        this.ecmaPrompts = {ecma: 'es6'};
      }
      done();
    }.bind(this));
};

module.exports = ecmaPrompts;