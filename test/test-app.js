'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('aowp-marionette:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        someOption: true,
        appName: 'demo-application'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc'
    ]);
  });
  it('sets name', function() {
    assert.fileContent('package.json', /"name": "demo-application"/);
  });
});

describe('aowp-marionette:app with arcanist file default URL', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        someOption: true,
        phabricatorDeps: true,
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc',
      '.arcconfig',
      '.arclint'
    ]);
  });
  it('sets phabricator uri', function() {
    assert.fileContent('.arcconfig', /"conduit_uri" : "http:\/\/127\.0\.0\.1\/"/);
  });
});

describe('aowp-marionette:app with arcanist and specified URL', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        someOption: true,
        phabricatorDeps: true,
        phabricatorIP: 'phabricator.mydomain.com'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc',
      '.arcconfig',
      '.arclint'
    ]);
  });
  it('sets default phabricator uri', function() {
    assert.fileContent('.arcconfig', /"conduit_uri" : "http:\/\/phabricator.mydomain.com\/"/);
  });
});
