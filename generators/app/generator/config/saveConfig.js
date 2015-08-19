'use strict';

var saveConfig = function () {
  if (!this.existingConfig) {
    this.config.set('config', this.answers);
  }
  this.config.set('version', this.pkg.version);
  this.config.save();
};

module.exports = saveConfig;
