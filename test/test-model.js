'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('aowp-marionette:model with tests', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/model'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['some-feature'])
      .withOptions({
        directory: 'some-feature',
        tests: 'appcode'
      })
      .on('end', done);
  });
  it('creates files', function () {
    assert.file([
      'app/scripts/apps/some-feature/some-feature-model.js',
      'app/scripts/apps/some-feature/some-feature-model-test.js'
    ]);
  });
  it('test contains AMD path', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-model-test.js', /some-feature-model/);
  });
  it('test contains class', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-model-test.js', /(SomeFeatureModel)/);
    assert.fileContent('app/scripts/apps/some-feature/some-feature-model-test.js', /new SomeFeatureModel()/);
  });
});


describe('aowp-marionette:model with separate tests', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/model'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['some-feature'])
      .withOptions({
        tests: 'separate'
      })
      .on('end', done);
  });
  it('creates files', function () {
    assert.file([
      'app/scripts/apps/some-feature/some-feature-model.js',
      'test/apps/some-feature/some-feature-model-test.js'
    ]);
  });
});
