'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('aowp-marionette:collection with existing model', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/collection'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['some-feature'])
      .withOptions({
        directory: 'some-feature',
        model: 'some-model'
      })
      .on('end', done);
  });
  it('creates files', function () {
    assert.file([
      'app/scripts/apps/some-feature/some-feature-collection.js',
      'app/scripts/apps/some-feature/some-feature-collection-test.js'
    ]);
  });
  it('view contains AMD dependency', function () {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection.js', /.\/some-model/);
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection.js', /, SomeModel/);
  });
  it('view contains model Class', function () {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection.js', /model: SomeModel/);
  });
  it('test contains AMD path', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-test.js', /some-feature-collection/);

  });
  it('test contains class', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-test.js', /new SomeFeatureCollection()/);
  });
});

describe('collection without existing model', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/collection'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['other-feature'])
      .withOptions({
        directory: 'other-feature'
      })
      .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:model']])
      .on('end', done);
  });
  it('creates files', function () {
    assert.file([
      'app/scripts/apps/other-feature/other-feature-collection.js',
      'app/scripts/apps/other-feature/other-feature-collection-test.js'
    ]);
  });
  it('contains AMD dependency', function () {
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /.\/other-feature-model/);
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /, OtherFeatureModel/);
  });
  it('contains model Class', function () {
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /model: OtherFeatureModel/);
  });
});
