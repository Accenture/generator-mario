'use strict';

var arcanistPrompts  = function() {
    var done = this.async();
    var that = this;
    that.arcanistPrompts = that.arcanistPrompts || {};

    this.prompt({
        type: 'confirm',
        name: 'phabricatorDeps',
        message: 'Would you like to include Arcanist config files?',
        default: false
    }, function(answer) {
        if (answer.phabricatorDeps) {
            that.arcanistPrompts.phabricatorDeps = answer.phabricatorDeps;
            this.prompt({
                type: 'input',
                name: 'phabricatorIP',
                message: 'What is IP address of your Phabricator server?',
                default: '127.0.0.1'
            }, function(answer) {
                var url = answer.phabricatorIP + '';
                if (url.indexOf('http') !== -1) {
                    that.arcanistPrompts.phabricatorIP = url;
                } else {
                    that.arcanistPrompts.phabricatorIP = 'http://' + url;
                }
                done();
            });
        } else {
            done();
        }

    }.bind(this));
};

module.exports = arcanistPrompts;
