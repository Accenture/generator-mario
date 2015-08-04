'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var existTest = require('../generators/path-verification');
var stub;
describe('aowp-marionette:collectionview with existing itemview', function () {
  before(function (done) {
    stub = sinon.stub(existTest, 'verifyPath', function () {
      return true;
    });
    helpers.run(path.join(__dirname, '../generators/collectionview'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['some-feature'])
      .withOptions({
        directory: 'some-feature',
        itemview: 'some-item-view'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/scripts/apps/some-feature/some-feature-collection-view.js',
      'app/scripts/apps/some-feature/some-feature-collection-view-test.js'
    ]);

  });
  it('contains AMD dependency', function () {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view.js', /some-item-view/);
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view.js', /, SomeItemView/);
  });
  it('contains childView', function () {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view.js', /childView: SomeItemView/);
  });
  it('test with right content', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view-test.js', /.\/some-feature-collection-view/);
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view-test.js', /SomeFeatureCollectionView/);
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view-test.js', /new SomeFeatureCollectionView/);
  });
  afterEach(function(done){
    stub.restore();
    done();
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
  it('contains AMD dependency', function () {
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /other-feature-item-view/);
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /, OtherFeatureItemView/);
  });
  it('contains childView', function () {
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /childView: OtherFeatureItemView/);
  });
});

describe('aowp-marionette:collectionview with existing itemview, expanded dirs', function () {
  before(function (done) {
    stub = sinon.stub(existTest, 'verifyPath', function () {
      return true;
    });
    helpers.run(path.join(__dirname, '../generators/collectionview'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['other-feature'])
      .withOptions({
        directory: 'app/scripts/apps/other-feature',
        itemview: 'app/scripts/apps/vegetables/broccoli-item-view.js'
      })
      .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:itemview']])
      .on('end', done);
  });
  afterEach(function(done){
    stub.restore();
    done();
  });
  it('creates files', function () {
    assert.file([
      'app/scripts/apps/other-feature/other-feature-collection-view.js',
      'app/scripts/apps/other-feature/other-feature-collection-view-test.js'
    ]);
  });
  it('contains AMD dependency', function () {
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /apps\/vegetables\/broccoli-item-view/);
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /, BroccoliItemView/);
  });
  it('contains childView', function () {
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /childView: BroccoliItemView/);
  });
});
