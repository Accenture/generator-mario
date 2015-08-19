'use strict';

var _ = require('lodash');

var answersConfig = function () {

  if (this.existingConfig) {
    this.answers = this.config.get('config');
  }
  else {
    this.answers = _.merge(
      this.initPrompts,
      this.arcanistPrompts,
      this.webpackPrompts,
      this.ecmaPrompts
    );
  }

  // Project Info
  this.projectName = this.answers.projectName;
  this.phabricatorDeps = this.answers.phabricatorDeps;
  this.phabricatorIP = this.answers.phabricatorIP;
  this.ecma = this.answers.ecma;
};

module.exports = answersConfig;
