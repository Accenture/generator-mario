'use strict';

var webpackPrompts  = function () {
    var done = this.async();
    this.prompt({
        type: 'confirm',
        name: 'useWebpack',
        message: 'Would you like to use Webpack instead of requireJS (experimental)?',
        default: false
    }, function (answers) {
        this.webpackPrompts = answers;
        done();
    }.bind(this));
};

module.exports = webpackPrompts;