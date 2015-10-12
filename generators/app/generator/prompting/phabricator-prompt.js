'use strict';

module.exports = function(Generator) {

  function filterUrl(url) {
    return (url.indexOf('http') !== -1) ? url : 'http://' + url;
  }

  function promptAddress(generator, done) {
    generator.prompt({
      type: 'input',
      name: 'phabricatorIP',
      message: 'What is IP address of your Phabricator server?',
      default: 'http://127.0.0.1',
      filter: filterUrl
    }, function(answer) {
      generator._.merge(generator.preferences, answer);

      done();
    });
  }

  Generator.prototype.phabricatorPrompt = function() {
    var done = this.async();
    this.arcanistPrompts = {};

    this.prompt({
      type: 'confirm',
      name: 'phabricatorDeps',
      message: 'Are you using Phabricator?',
      default: false
    }, function(answer) {
      if (answer.phabricatorDeps) {
        this._.merge(this.preferences, answer);

        promptAddress(this, done);
      } else {
        done();
      }
    }.bind(this));
  };

};
