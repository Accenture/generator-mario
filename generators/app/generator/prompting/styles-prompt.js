'use strict';

module.exports = function(Generator) {

  Generator.prototype.stylesPrompt = function() {
    var done = this.async();
    this.prompt({
      type: 'list',
      name: 'styles',
      message: 'What style preprocessor would you like to use?',
      choices: [
        { name: 'Less', value: 'less' },
        { name: 'Sass', value: 'sass' }
      ]
    }, function(answer) {
      this._.merge(this.preferences, answer);

      done();
    }.bind(this));
  };
};
