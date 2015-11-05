'use strict';

var yeoman = require('yeoman-generator');
var pkgJSON = require('../../package.json');

/**
 * Modules containing prototype definitions.
 * Order of imported modules is important for the generator run loop
 */
var _modules = [
  './generator/prompting/config-prompt',
  './generator/prompting/name-prompt',
	'./generator/prompting/ecma-prompt',
  './generator/prompting/test-framework-prompt',
	'./generator/prompting/test-prompt',
  './generator/prompting/styles-prompt',
  './generator/prompting/build-tool-prompt',
  './generator/prompting/phabricator-prompt',
  './generator/configuring/save-config',
  './generator/configuring/install-config',
  './generator/writing/app-files',
  './generator/writing/project-files'
];

var Generator = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = pkgJSON;

    //config object for all prompt related info
    this.preferences = {};
  }

});

_modules.forEach(function(_module) {
  require(_module)(Generator);
});

module.exports = Generator;
