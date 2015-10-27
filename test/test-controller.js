'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs-extra');
var os = require('os');

describe('mario:controller', function() {

  describe('without options', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .withArguments(['my_controller'])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file(['app/scripts/apps/my_controller/my_controller.js']);
    });
  });

  describe('without options ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .withArguments(['my_controller'])
        .withLocalConfig({preferences: {ecma: 6}})
        .on('end', done);
    });
    it('creates files', function() {
      assert.file(['app/scripts/apps/my_controller/my_controller.js']);
    });
  });

  describe('with options (dir, model, itemview)', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var modelPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_model.js');
          var itemViewPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_item_view.js');

          fs.ensureFile(modelPath, function() {
            fs.ensureFile(itemViewPath, done);
          });
        })
        .withArguments(['my_controller'])
        .withOptions({
          directory: 'some_feature',
          model: 'pregen/pregen_model',
          itemview: 'pregen/pregen_item_view'
        })
        .on('end', done);
    });

    it('creates file', function() {
      assert.file(['app/scripts/apps/some_feature/my_controller.js']);
    });

    it('contains model', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /apps\/pregen\/pregen_model/);
    });

    it('contains itemview', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /apps\/pregen\/pregen_item_view/);
    });

    it('contains init code', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var model = new Model\(\);/);
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var pregenItemView = new PregenItemView\(\{model: model\}\);/);
    });
  });

  describe('with options (dir, model, itemview) ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var modelPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_model.js');
          var itemViewPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_item_view.js');

          fs.ensureFile(modelPath, function() {
            fs.ensureFile(itemViewPath, done);
          });
        })
        .withArguments(['my_controller'])
        .withOptions({
          directory: 'some_feature',
          model: 'pregen/pregen_model',
          itemview: 'pregen/pregen_item_view',
        })
        .withLocalConfig({preferences: {ecma: 6}})
        .on('end', done);
    });

    it('creates file', function() {
      assert.file(['app/scripts/apps/some_feature/my_controller.js']);
    });

    it('contains model module dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /import Model from 'apps\/pregen\/pregen_model'/);
    });

    it('contains itemview module dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /import PregenItemView from 'apps\/pregen\/pregen_item_view'/);
    });

    it('contains init code', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var model = new Model\(\);/);
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var pregenItemView = new PregenItemView\(\{model: model\}\);/);
    });
  });

  describe('with options (dir, collection, collectionview)', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var collectionPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_collection.js');
          var collectionViewPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_collection_view.js');

          fs.ensureFile(collectionPath, function() {
            fs.ensureFile(collectionViewPath, done);
          });
        })
        .withArguments(['my_controller'])
        .withOptions({
          directory: 'some_feature',
          collection: 'pregen/pregen_collection',
          collectionview: 'pregen/pregen_collection_view'
        })
        .on('end', done);
    });

    it('creates file', function() {
      assert.file(['app/scripts/apps/some_feature/my_controller.js']);
    });

    it('contains collection', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /apps\/pregen\/pregen_collection/);
    });

    it('contains collectionview', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /apps\/pregen\/pregen_collection_view/);
    });

    it('contains init code', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var collection = new Collection\(\);/);
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var pregenCollectionView = new PregenCollectionView\(\{collection: collection\}\);/);
    });
  });

  describe('with options (dir, collection, collectionview) ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var collectionPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_collection.js');
          var collectionViewPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_collection_view.js');

          fs.ensureFile(collectionPath, function() {
            fs.ensureFile(collectionViewPath, done);
          });
        })
        .withArguments(['my_controller'])
        .withOptions({
          directory: 'some_feature',
          collection: 'pregen/pregen_collection',
          collectionview: 'pregen/pregen_collection_view'
        })
        .withLocalConfig({preferences: {ecma: 6}})
        .on('end', done);
    });

    it('creates file', function() {
      assert.file(['app/scripts/apps/some_feature/my_controller.js']);
    });

    it('contains collection module dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /import Collection from 'apps\/pregen\/pregen_collection'/);
    });

    it('contains collectionview module dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /import PregenCollectionView from 'apps\/pregen\/pregen_collection_view'/);
    });

    it('contains init code', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var collection = new Collection\(\);/);
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var pregenCollectionView = new PregenCollectionView\(\{collection: collection\}\);/);
    });
  });

  describe('with options (dir, model, collection, compositeview)', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var modelPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_model.js');
          var collectionPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_collection.js');
          var collectionViewPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_composite_view.js');

          fs.ensureFile(modelPath, function() {
            fs.ensureFile(collectionPath, function() {
              fs.ensureFile(collectionViewPath, done);
            });
          });
        })
        .withArguments(['my_controller'])
        .withOptions({
          directory: 'some_feature',
          model: 'pregen/pregen_model',
          collection: 'pregen/pregen_collection',
          compositeview: 'pregen/pregen_composite_view'
        })
        .on('end', done);
    });

    it('creates file', function() {
      assert.file(['app/scripts/apps/some_feature/my_controller.js']);
    });

    it('contains model', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /apps\/pregen\/pregen_model/);
    });

    it('contains collection', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /apps\/pregen\/pregen_collection/);
    });

    it('contains collectionview', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /apps\/pregen\/pregen_composite_view/);
    });

    it('contains init code', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var model = new Model\(\);/);
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var collection = new Collection\(\);/);
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var pregenCompositeView = new PregenCompositeView\(\{model: model, collection: collection\}\);/);
    });
  });

  describe('with options (dir, model, collection, compositeview) ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var modelPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_model.js');
          var collectionPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_collection.js');
          var collectionViewPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen_composite_view.js');

          fs.ensureFile(modelPath, function() {
            fs.ensureFile(collectionPath, function() {
              fs.ensureFile(collectionViewPath, done);
            });
          });
        })
        .withArguments(['my_controller'])
        .withOptions({
          directory: 'some_feature',
          model: 'pregen/pregen_model',
          collection: 'pregen/pregen_collection',
          compositeview: 'pregen/pregen_composite_view'
        })
        .withLocalConfig({preferences: {ecma: 6}})
        .on('end', done);
    });

    it('creates file', function() {
      assert.file(['app/scripts/apps/some_feature/my_controller.js']);
    });

    it('contains model module dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /import Model from 'apps\/pregen\/pregen_model'/);
    });

    it('contains collection module dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /import Collection from 'apps\/pregen\/pregen_collection'/);
    });

    it('contains collectionview module dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /import PregenCompositeView from 'apps\/pregen\/pregen_composite_view'/);
    });

    it('contains init code', function() {
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var model = new Model\(\);/);
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var collection = new Collection\(\);/);
      assert.fileContent('app/scripts/apps/some_feature/my_controller.js', /var pregenCompositeView = new PregenCompositeView\(\{model: model, collection: collection\}\);/);
    });
  });

  describe('with dir option expanded', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['my_controller'])
        .withOptions({ directory: 'app/scripts/apps/some_feature' })
        .on('end', done);
    });
    it('creates files', function() {
      assert.file(['app/scripts/apps/some_feature/my_controller.js']);
    });
  });

  describe('with dir option expanded ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['my_controller'])
        .withOptions({ directory: 'app/scripts/apps/some_feature' })
        .withLocalConfig({preferences: {ecma: 6}})
        .on('end', done);
    });
    it('creates files', function() {
      assert.file(['app/scripts/apps/some_feature/my_controller.js']);
    });
  });
});
