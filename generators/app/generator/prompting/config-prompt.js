'use strict';

module.exports = function(Generator) {

  Generator.prototype.configPrompt = function() {
		if (!this.config.get('preferences')) {
      this.useExistingConfig = false;
			return;
		}

    var done = this.async();
    this.prompt({
      type: 'confirm',
      name: 'useExistingConfig',
      message: 'Do you want to use existing \'.yo-rc.json\' config file?',
      default: true
    }, function(answer) {
      if (answer.useExistingConfig) {
        this.preferences = this.config.get('preferences');
      }

      this.useExistingConfig = answer.useExistingConfig;

      done();
    }.bind(this));
  };
};
