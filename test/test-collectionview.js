'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var existTest = require('../generators/utils');
var stub;

describe('mario:collectionview', function() {
  describe('with existing itemview', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withOptions({ directory: 'some_feature', itemview: 'some_item_view' })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_collection_view.js',
        'app/scripts/apps/some_feature/some_feature_collection_view_test.js'
      ]);

    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_view.js', /some_item_view/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_view.js', /, SomeItemView/);
    });
    it('contains childView', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_view.js', /childView: SomeItemView/);
    });
    it('test with right content', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_view_test.js', /.\/some_feature_collection_view/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_view_test.js', /SomeFeatureCollectionView/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_view_test.js', /new SomeFeatureCollectionView/);
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
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withOptions({ directory: 'some_feature', itemview: 'some_item_view' })
        .withLocalConfig({ preferences: {ecma: 6} })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_collection_view.js',
        'app/scripts/apps/some_feature/some_feature_collection_view_test.js'
      ]);
    });
    it('contains itemview module dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_view.js', /import SomeItemView from '.\/some_item_view'/);
    });
    it('contains childView', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_view.js', /childView: SomeItemView/);
    });
    it('test with right content', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_view_test.js', /.\/some_feature_collection_view/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_view_test.js', /SomeFeatureCollectionView/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_view_test.js', /new SomeFeatureCollectionView/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('without existing itemview ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['other_feature'])
        .withLocalConfig({ preferences: {ecma: 6} })
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other_feature/other_feature_collection_view.js',
        'app/scripts/apps/other_feature/other_feature_collection_view_test.js'
      ]);
    });
    it('contains module import', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_view.js', /import OtherFeatureItemView from '.\/other_feature_item_view'/);
    });
    it('contains childView', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_view.js', /childView: OtherFeatureItemView/);
    });
    it('test contains view', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_view_test.js', /import OtherFeatureCollectionView from 'apps\/other_feature\/other_feature_collection_view'/);
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_view_test.js', /describe\('OtherFeatureCollectionView view'/);
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_view_test.js', /view = new OtherFeatureCollectionView/);
    });
  });

  describe('without existing itemview', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['other_feature'])
        .withOptions({
          directory: 'other_feature'
        })
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other_feature/other_feature_collection_view.js',
        'app/scripts/apps/other_feature/other_feature_collection_view_test.js'
      ]);
    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_view.js', /other_feature_item_view/);
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_view.js', /, OtherFeatureItemView/);
    });
    it('contains childView', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_view.js', /childView: OtherFeatureItemView/);
    });
  });

  describe('with existing itemview, expanded dirs', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['other_feature'])
        .withOptions({
          directory: 'app/scripts/apps/other_feature',
          itemview: 'app/scripts/apps/vegetables/broccoli_item_view.js'
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
        'app/scripts/apps/other_feature/other_feature_collection_view.js',
        'app/scripts/apps/other_feature/other_feature_collection_view_test.js'
      ]);
    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_view.js', /apps\/vegetables\/broccoli_item_view/);
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_view.js', /, BroccoliItemView/);
    });
    it('contains childView', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_view.js', /childView: BroccoliItemView/);
    });
  });

  describe('with existing itemview, expanded dirs ES6', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['other_feature'])
        .withOptions({
          directory: 'app/scripts/apps/other_feature',
          itemview: 'app/scripts/apps/heroes/storm_item_view.js'
        })
        .withLocalConfig({ preferences: {ecma: 6} })
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .on('end', done);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other_feature/other_feature_collection_view.js',
        'app/scripts/apps/other_feature/other_feature_collection_view_test.js'
      ]);
    });
    it('contains itemview module dependency', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_view.js', /import StormItemView from 'apps\/heroes\/storm_item_view'/);
    });
    it('contains childView', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_view.js', /childView: StormItemView/);
    });
  });

  describe('with tests in separate dir', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withLocalConfig({ preferences: {tests: 'custom', testFolder: 'test/' }})
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_collection_view.js',
        'test/apps/some_feature/some_feature_collection_view_test.js'
      ]);
    });
    it('test contains AMD path', function() {
      assert.fileContent('test/apps/some_feature/some_feature_collection_view_test.js', /some_feature_collection_view/);

    });
    it('test contains collectionview class', function() {
      assert.fileContent('test/apps/some_feature/some_feature_collection_view_test.js', /new SomeFeatureCollectionView()/);
    });
  });

  describe('with tests in separate dir ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collectionview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withLocalConfig({ preferences: {tests: 'custom', testFolder: 'test/', ecma: 6 }})
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_collection_view.js',
        'test/apps/some_feature/some_feature_collection_view_test.js'
      ]);
    });
    it('test contains collectionview module', function() {
      assert.fileContent('test/apps/some_feature/some_feature_collection_view_test.js', /import SomeFeatureCollectionView from 'apps\/some_feature\/some_feature_collection_view'/);

    });
    it('test contains collectionview class', function() {
      assert.fileContent('test/apps/some_feature/some_feature_collection_view_test.js', /new SomeFeatureCollectionView()/);
    });
  });
});
