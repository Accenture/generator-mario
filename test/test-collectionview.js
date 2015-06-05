'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('aowp-marionette:collectionview with existing itemview', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/collectionview'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['some-feature'])
      .withOptions({
        directory: 'some-feature',
        itemview: 'some-model'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/scripts/apps/some-feature/some-feature-collection-view.js',
      'app/scripts/apps/some-feature/some-feature-collection-view-test.js'
    ]);
  });
});

describe('aowp-marionette:collectionview without existing itemview', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/collectionview'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['other-feature'])
      .withOptions({
        directory: 'other-feature'
      })
      .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:itemview']])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/scripts/apps/other-feature/other-feature-collection-view.js',
      'app/scripts/apps/other-feature/other-feature-collection-view-test.js'
    ]);
  });
});
