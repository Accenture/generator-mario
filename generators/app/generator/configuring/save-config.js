'use strict';

module.exports = function(Generator) {

  Generator.prototype.saveConfig = function() {
    this.config.set('preferences', this.preferences);
    this.config.set('version', this.pkg.version);
    this.config.save();
  };

};
