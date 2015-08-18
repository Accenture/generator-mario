'use strict';

var ecmaPrompts = function (){
    var done = this.async();
    this.prompt({
        type: 'list',
        name: 'ecma',
        default: 0,
        store   : true,
        message: 'Would you like to use ECMAScript 5 (ES5) or ECMAScript 2015 (ES6) standard?',
        choices: ['es5', 'es6']
    }, function(answer) {
        this.ecmaPrompts = answer;
        done();
    }.bind(this));
};

module.exports = ecmaPrompts;