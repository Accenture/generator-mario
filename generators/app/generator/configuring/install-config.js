'use strict';

module.exports = function(Generator) {

  Generator.prototype.installConfig = function() {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  };

};
