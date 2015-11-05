'use strict';

var lodash = require('lodash');

module.exports = function(Generator) {

  Generator.prototype.stylesPrompt = function() {
    if (this.useExistingConfig && this.preferences.styles) {
      return;
    }

    var done = this.async();
    this.prompt({
      type: 'list',
      name: 'styles',
      message: 'What style preprocessor would you like to use?',
      choices: [
        { name: 'Less', value: 'less' },
        { name: 'Sass', value: 'sass' }
      ],
      default: 'less'
    }, function(answer) {
      lodash.merge(this.preferences, answer);

      done();
    }.bind(this));
  };
};
