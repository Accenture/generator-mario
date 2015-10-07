'use strict';

var chalk = require('chalk');
var yosay = require('yosay');

var initPrompts = function() {
    var done = this.async();
    this.log(yosay(
        'Welcome to the ' + chalk.red('Marionette') + ' generator!'
    ));
    this.prompt({
        type: 'input',
        name: 'projectName',
        message: 'How would you like to name your application?',
        default: 'mario-app'
    }, function(answers) {
        this.initPrompts = answers;
        done();
    }.bind(this));
};

module.exports = initPrompts;
