'use strict';

var installConfig = function () {
    this.installDependencies({
        skipInstall: this.options['skip-install']
    });
};

module.exports = installConfig;