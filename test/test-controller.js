'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('aowp-marionette:controller without directory option', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/controller'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['my-controller'])
      .on('end', done);
  });
  it('creates files', function() {
    assert.file([
      'app/scripts/apps/my-controller/my-controller.js'
    ]);
  });
});

describe('aowp-marionette:controller with directory option', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/controller'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['my-controller'])
      .withOptions({
        directory: 'some-feature'
      })
      .on('end', done);
  });
  it('creates files', function() {
    assert.file([
      'app/scripts/apps/some-feature/my-controller.js'
    ]);
  });
});

describe('aowp-marionette:controller with dir option expanded', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/controller'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['my-controller'])
      .withOptions({
        directory: 'app/scripts/apps/some-feature'
      })
      .on('end', done);
  });
  it('creates files', function() {
    assert.file([
      'app/scripts/apps/some-feature/my-controller.js'
    ]);
  });
});
