'use strict';

var lodash = require('lodash');

var answersConfig = function() {

  if (this.existingConfig) {
    this.answers = this.config.get('config');
  } else {
    this.answers = lodash.merge(
      this.initPrompts,
      this.arcanistPrompts,
      this.webpackPrompts,
      this.ecmaPrompts,
      this.tests
    );
  }

  // Project Info
  this.projectName = this.answers.projectName;
  this.phabricatorDeps = this.answers.phabricatorDeps;
  this.phabricatorIP = this.answers.phabricatorIP;
  this.ecma = this.answers.ecma;
  this.tests = this.answers.tests;
};

module.exports = answersConfig;
