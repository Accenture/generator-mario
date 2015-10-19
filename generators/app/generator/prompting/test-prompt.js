'use strict';

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
      generator._.merge(generator.preferences, answer);
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
      choices: ['Test folder', 'With my app code'],
      filter: function(val) {
        var filterMap = {
          'With my app code': 'appcode',
          'Test folder': 'custom'
        };
        return filterMap[val];
      }
    }, function(answer) {
      this._.merge(this.preferences, answer);

      // testFolder setup
      if (this.preferences.tests === 'custom') {
        customFolderPrompt(this, done);
      } else {
        this._.merge(this.preferences, { testFolder: 'app/scripts/' });
        done();
      }

    }.bind(this));
  };
};
