'use strict';

module.exports = function(Generator) {

  Generator.prototype.ecmaPrompt = function() {
    if (this.preferences.buildTool !== 'grunt') {
      this._.merge(this.preferences, {ecma: 5});
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
      ]
    }, function(answer) {
      this._.merge(this.preferences, answer);

      done();
    }.bind(this));
  };
};
