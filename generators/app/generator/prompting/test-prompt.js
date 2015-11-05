'use strict';

var lodash = require('lodash');

module.exports = function(Generator) {

  function appendSlash(testFolderPath) {
    if (testFolderPath.slice(-1) === '/') {
      return testFolderPath;
    } else {
      return testFolderPath + '/';
    }
  }

  function customFolderPrompt(generator, done) {
    generator.prompt({
      type: 'input',
      name: 'testFolder',
      message: 'Specify the folder for your tests.',
      default: 'test',
      filter: appendSlash
    }, function(answer) {
      lodash.merge(generator.preferences, answer);
      done();
    });
  }

  Generator.prototype.testPrompt = function() {
    if (this.useExistingConfig && this.preferences.tests) {
      return;
    }

    var done = this.async();
    this.prompt({
      type: 'list',
      name: 'tests',
      message: 'Where would you like to store your test files?',
      choices: [
        { name: 'Test folder', value: 'custom'},
        { name: 'With my app code', value: 'appcode'}
      ],
      default: 'custom'
    }, function(answer) {
      lodash.merge(this.preferences, answer);

      // testFolder setup
      if (this.preferences.tests === 'custom') {
        customFolderPrompt(this, done);
      } else {
        lodash.merge(this.preferences, { testFolder: 'app/scripts/' });
        done();
      }

    }.bind(this));
  };
};
