'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('aowp-marionette:collection with existing controller', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/router'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['some-feature'])
      .withOptions({
        directory: 'some-feature',
        controller: 'some-controller'
      })
      .on('end', done);
  });
  it('creates files', function () {
    assert.file([
      'app/scripts/apps/some-feature/some-feature-router.js'
    ]);
  });
  it('contains AMD dependency', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /'.\/some-controller'/);
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /, SomeController/);
  });
  it('contains controller class', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /new SomeController/);
  });
});

describe('aowp-marionette:collection without existing controller', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/router'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['some-feature'])
      .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:controller']])
      .withOptions({
        directory: 'some-feature'
      })
      .on('end', done);
  });
  it('creates files', function () {
    assert.file([
      'app/scripts/apps/some-feature/some-feature-router.js'
    ]);
  });
  it('contains AMD dependency', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /'.\/some-feature-controller'/);
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /, SomeFeatureController/);
  });
  it('contains controller class', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /new SomeFeatureController/);
  });
});
