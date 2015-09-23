'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var existTest = require('../generators/utils');
var stub;

describe('aowp-marionette:collectionview', function() {
  describe('with existing itemview', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
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

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some-feature/some-feature-collection-view.js',
        'app/scripts/apps/some-feature/some-feature-collection-view-test.js'
      ]);

    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view.js', /some-item-view/);
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view.js', /, SomeItemView/);
    });
    it('contains childView', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view.js', /childView: SomeItemView/);
    });
    it('test with right content', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view-test.js', /.\/some-feature-collection-view/);
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view-test.js', /SomeFeatureCollectionView/);
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view-test.js', /new SomeFeatureCollectionView/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('with existing itemview ES6', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['some-feature'])
        .withOptions({
          directory: 'some-feature',
          itemview: 'some-item-view',
          ecma: 6
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some-feature/some-feature-collection-view.js',
        'app/scripts/apps/some-feature/some-feature-collection-view-test.js'
      ]);
    });
    it('contains itemview module dependency', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view.js', /import SomeItemView from '.\/some-item-view'/);
    });
    it('contains childView', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view.js', /childView: SomeItemView/);
    });
    it('test with right content', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view-test.js', /.\/some-feature-collection-view/);
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view-test.js', /SomeFeatureCollectionView/);
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-view-test.js', /new SomeFeatureCollectionView/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('without existing itemview ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['other-feature'])
        .withOptions({
          ecma: 6
        })
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other-feature/other-feature-collection-view.js',
        'app/scripts/apps/other-feature/other-feature-collection-view-test.js'
      ]);
    });
    it('contains module import', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /import OtherFeatureItemView from '.\/other-feature-item-view'/);
    });
    it('contains childView', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /childView: OtherFeatureItemView/);
    });
    it('test contains view', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view-test.js', /import OtherFeatureCollectionView from 'apps\/other-feature\/other-feature-collection-view'/);
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view-test.js', /describe\('OtherFeatureCollectionView view'/);
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view-test.js', /view = new OtherFeatureCollectionView/);
    });
  });

  describe('without existing itemview', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['other-feature'])
        .withOptions({
          directory: 'other-feature'
        })
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other-feature/other-feature-collection-view.js',
        'app/scripts/apps/other-feature/other-feature-collection-view-test.js'
      ]);
    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /other-feature-item-view/);
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /, OtherFeatureItemView/);
    });
    it('contains childView', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /childView: OtherFeatureItemView/);
    });
  });

  describe('with existing itemview, expanded dirs', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['other-feature'])
        .withOptions({
          directory: 'app/scripts/apps/other-feature',
          itemview: 'app/scripts/apps/vegetables/broccoli-item-view.js'
        })
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .on('end', done);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other-feature/other-feature-collection-view.js',
        'app/scripts/apps/other-feature/other-feature-collection-view-test.js'
      ]);
    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /apps\/vegetables\/broccoli-item-view/);
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /, BroccoliItemView/);
    });
    it('contains childView', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /childView: BroccoliItemView/);
    });
  });

  describe('with existing itemview, expanded dirs ES6', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['other-feature'])
        .withOptions({
          directory: 'app/scripts/apps/other-feature',
          itemview: 'app/scripts/apps/heroes/storm-item-view.js',
          ecma: 6
        })
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .on('end', done);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other-feature/other-feature-collection-view.js',
        'app/scripts/apps/other-feature/other-feature-collection-view-test.js'
      ]);
    });
    it('contains itemview module dependency', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /import StormItemView from 'apps\/heroes\/storm-item-view'/);
    });
    it('contains childView', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-view.js', /childView: StormItemView/);
    });
  });

  describe('with tests in separate dir', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['some-feature'])
        .withOptions({
          tests: 'separate'
        })
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some-feature/some-feature-collection-view.js',
        'test/apps/some-feature/some-feature-collection-view-test.js'
      ]);
    });
    it('test contains AMD path', function() {
      assert.fileContent('test/apps/some-feature/some-feature-collection-view-test.js', /some-feature-collection-view/);

    });
    it('test contains collectionview class', function() {
      assert.fileContent('test/apps/some-feature/some-feature-collection-view-test.js', /new SomeFeatureCollectionView()/);
    });
  });

  describe('with tests in separate dir ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['some-feature'])
        .withOptions({
          tests: 'separate',
          ecma: 6
        })
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some-feature/some-feature-collection-view.js',
        'test/apps/some-feature/some-feature-collection-view-test.js'
      ]);
    });
    it('test contains collectionview module', function() {
      assert.fileContent('test/apps/some-feature/some-feature-collection-view-test.js', /import SomeFeatureCollectionView from 'apps\/some-feature\/some-feature-collection-view'/);

    });
    it('test contains collectionview class', function() {
      assert.fileContent('test/apps/some-feature/some-feature-collection-view-test.js', /new SomeFeatureCollectionView()/);
    });
  });
});
