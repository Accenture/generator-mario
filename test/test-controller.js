'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs-extra');
var os = require('os');

describe('aowp-marionette:controller', function() {

  describe('without options', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .withArguments(['my-controller'])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file(['app/scripts/apps/my-controller/my-controller.js']);
    });
  });

  describe('without options ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .withArguments(['my-controller'])
        .withOptions({
          ecma: 6
        })
        .on('end', done);
    });
    it('creates files', function() {
      assert.file(['app/scripts/apps/my-controller/my-controller.js']);
    });
  });

  describe('with options (dir, model, itemview)', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var modelPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-model.js');
          var itemViewPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-item-view.js');

          fs.ensureFile(modelPath, function() {
            fs.ensureFile(itemViewPath, done);
          });
        })
        .withArguments(['my-controller'])
        .withOptions({
          directory: 'some-feature',
          model: 'pregen/pregen-model',
          itemview: 'pregen/pregen-item-view'
        })
        .on('end', done);
    });

    it('creates file', function() {
      assert.file(['app/scripts/apps/some-feature/my-controller.js']);
    });

    it('contains model', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /apps\/pregen\/pregen-model/);
    });

    it('contains itemview', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /apps\/pregen\/pregen-item-view/);
    });

    it('contains init code', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var model = new Model\(\);/);
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var pregenItemView = new PregenItemView\(\{model: model\}\);/);
    });
  });

  describe('with options (dir, model, itemview) ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var modelPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-model.js');
          var itemViewPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-item-view.js');

          fs.ensureFile(modelPath, function() {
            fs.ensureFile(itemViewPath, done);
          });
        })
        .withArguments(['my-controller'])
        .withOptions({
          directory: 'some-feature',
          model: 'pregen/pregen-model',
          itemview: 'pregen/pregen-item-view',
          ecma: 6
        })
        .on('end', done);
    });

    it('creates file', function() {
      assert.file(['app/scripts/apps/some-feature/my-controller.js']);
    });

    it('contains model module dependency', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /import Model from 'apps\/pregen\/pregen-model'/);
    });

    it('contains itemview module dependency', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /import PregenItemView from 'apps\/pregen\/pregen-item-view'/);
    });

    it('contains init code', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var model = new Model\(\);/);
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var pregenItemView = new PregenItemView\(\{model: model\}\);/);
    });
  });

  describe('with options (dir, collection, collectionview)', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var collectionPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-collection.js');
          var collectionViewPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-collection-view.js');

          fs.ensureFile(collectionPath, function() {
            fs.ensureFile(collectionViewPath, done);
          });
        })
        .withArguments(['my-controller'])
        .withOptions({
          directory: 'some-feature',
          collection: 'pregen/pregen-collection',
          collectionview: 'pregen/pregen-collection-view'
        })
        .on('end', done);
    });

    it('creates file', function() {
      assert.file(['app/scripts/apps/some-feature/my-controller.js']);
    });

    it('contains collection', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /apps\/pregen\/pregen-collection/);
    });

    it('contains collectionview', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /apps\/pregen\/pregen-collection-view/);
    });

    it('contains init code', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var collection = new Collection\(\);/);
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var pregenCollectionView = new PregenCollectionView\(\{collection: collection\}\);/);
    });
  });

  describe('with options (dir, collection, collectionview) ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var collectionPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-collection.js');
          var collectionViewPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-collection-view.js');

          fs.ensureFile(collectionPath, function() {
            fs.ensureFile(collectionViewPath, done);
          });
        })
        .withArguments(['my-controller'])
        .withOptions({
          directory: 'some-feature',
          collection: 'pregen/pregen-collection',
          collectionview: 'pregen/pregen-collection-view',
          ecma: 6
        })
        .on('end', done);
    });

    it('creates file', function() {
      assert.file(['app/scripts/apps/some-feature/my-controller.js']);
    });

    it('contains collection module dependency', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /import Collection from 'apps\/pregen\/pregen-collection'/);
    });

    it('contains collectionview module dependency', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /import PregenCollectionView from 'apps\/pregen\/pregen-collection-view'/);
    });

    it('contains init code', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var collection = new Collection\(\);/);
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var pregenCollectionView = new PregenCollectionView\(\{collection: collection\}\);/);
    });
  });

  describe('with options (dir, model, collection, compositeview)', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var modelPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-model.js');
          var collectionPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-collection.js');
          var collectionViewPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-composite-view.js');

          fs.ensureFile(modelPath, function() {
            fs.ensureFile(collectionPath, function() {
              fs.ensureFile(collectionViewPath, done);
            });
          });
        })
        .withArguments(['my-controller'])
        .withOptions({
          directory: 'some-feature',
          model: 'pregen/pregen-model',
          collection: 'pregen/pregen-collection',
          compositeview: 'pregen/pregen-composite-view'
        })
        .on('end', done);
    });

    it('creates file', function() {
      assert.file(['app/scripts/apps/some-feature/my-controller.js']);
    });

    it('contains model', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /apps\/pregen\/pregen-model/);
    });

    it('contains collection', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /apps\/pregen\/pregen-collection/);
    });

    it('contains collectionview', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /apps\/pregen\/pregen-composite-view/);
    });

    it('contains init code', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var model = new Model\(\);/);
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var collection = new Collection\(\);/);
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var pregenCompositeView = new PregenCompositeView\(\{model: model, collection: collection\}\);/);
    });
  });

  describe('with options (dir, model, collection, compositeview) ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var modelPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-model.js');
          var collectionPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-collection.js');
          var collectionViewPath = path.join(dir, 'app/scripts/apps/pregen', 'pregen-composite-view.js');

          fs.ensureFile(modelPath, function() {
            fs.ensureFile(collectionPath, function() {
              fs.ensureFile(collectionViewPath, done);
            });
          });
        })
        .withArguments(['my-controller'])
        .withOptions({
          directory: 'some-feature',
          model: 'pregen/pregen-model',
          collection: 'pregen/pregen-collection',
          compositeview: 'pregen/pregen-composite-view',
          ecma: 6
        })
        .on('end', done);
    });

    it('creates file', function() {
      assert.file(['app/scripts/apps/some-feature/my-controller.js']);
    });

    it('contains model module dependency', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /import Model from 'apps\/pregen\/pregen-model'/);
    });

    it('contains collection module dependency', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /import Collection from 'apps\/pregen\/pregen-collection'/);
    });

    it('contains collectionview module dependency', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /import PregenCompositeView from 'apps\/pregen\/pregen-composite-view'/);
    });

    it('contains init code', function() {
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var model = new Model\(\);/);
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var collection = new Collection\(\);/);
      assert.fileContent('app/scripts/apps/some-feature/my-controller.js', /var pregenCompositeView = new PregenCompositeView\(\{model: model, collection: collection\}\);/);
    });
  });

  describe('with dir option expanded', function() {
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
      assert.file(['app/scripts/apps/some-feature/my-controller.js']);
    });
  });

  describe('with dir option expanded ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['my-controller'])
        .withOptions({
          directory: 'app/scripts/apps/some-feature',
          ecma: 6
        })
        .on('end', done);
    });
    it('creates files', function() {
      assert.file(['app/scripts/apps/some-feature/my-controller.js']);
    });
  });
});
