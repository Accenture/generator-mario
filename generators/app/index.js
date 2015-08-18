'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var grabFiles = require('./helpers/grabFiles');
var path = require('path');

var config = [];
var tasks = {};

var order = [
    'existing',
    'initPrompts',
    'arcanistPrompts',
    'ecmaPrompts',
    'webpackPrompts',
    'answers',
    'saveConfig',
    'appFiles',
    'projectFiles',
    'installConfig'
];

config = grabFiles([
    path.join(__dirname, '/generator/prompts'),
    path.join(__dirname, '/generator/config'),
    path.join(__dirname, '/generator/files')
], order);

config.sort(function(a, b) {
    return a.index - b.index;
});

config.forEach(function(item) {
    tasks[item.name] = item.code;
});

module.exports =  yeoman.generators.Base.extend(_.merge({
  init: function () {
    this.pkg = require('../../package.json');
  }
},tasks));
