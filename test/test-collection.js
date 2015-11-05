'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var sinon = require('sinon');
var os = require('os');
var existTest = require('../generators/utils');
var stub;

describe('mario:collection', function() {
  describe('with existing model', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withOptions({ directory: 'some_feature', model: 'some_model' })
        .withLocalConfig({preferences: {ecma: 5, testFramework: 'mocha'}})
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_collection.js',
        'app/scripts/apps/some_feature/some_feature_collection_test.js'
      ]);
    });
    it('view contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection.js', /.\/some_model/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection.js', /, SomeModel/);
    });
    it('view contains model Class', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection.js', /model: SomeModel/);
    });
    it('test contains AMD path', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_test.js', /some_feature_collection/);
    });
    it('test contains class', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_test.js', /new SomeFeatureCollection()/);
    });
    it('test contains Mocha syntax', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_test.js', /expect\(collection\).to.be.ok/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('with existing model', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withOptions({ directory: 'some_feature', model: 'some_model' })
        .withLocalConfig({preferences: {ecma: 5, testFramework: 'jasmine'}})
        .on('end', done);
    });
    it('test contains Jasmine syntax', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection_test.js', /toBeTruthy/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('with existing model ES6', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['batman_and_robin'])
        .withOptions({ model: 'harlequin_model' })
        .withLocalConfig({preferences: {ecma: 6, testFramework: 'mocha'}})
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/batman_and_robin/batman_and_robin_collection.js',
        'app/scripts/apps/batman_and_robin/batman_and_robin_collection_test.js'
      ]);
    });
    it('view contains model module dependency', function() {
      assert.fileContent('app/scripts/apps/batman_and_robin/batman_and_robin_collection.js', /import HarlequinModel from '.\/harlequin_model'/);
    });
    it('view contains model Class', function() {
      assert.fileContent('app/scripts/apps/batman_and_robin/batman_and_robin_collection.js', /model: HarlequinModel/);
    });
    it('test contains collection module', function() {
      assert.fileContent('app/scripts/apps/batman_and_robin/batman_and_robin_collection_test.js', /import BatmanAndRobinCollection from 'apps\/batman_and_robin\/batman_and_robin_collection'/);

    });
    it('test contains collection class', function() {
      assert.fileContent('app/scripts/apps/batman_and_robin/batman_and_robin_collection_test.js', /new BatmanAndRobin()/);
    });
    it('test contains Mocha syntax', function() {
      assert.fileContent('app/scripts/apps/batman_and_robin/batman_and_robin_collection_test.js', /expect\(collection\).to.be.ok/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('with existing model ES6', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['batman_and_robin'])
        .withOptions({ model: 'harlequin_model' })
        .withLocalConfig({preferences: {ecma: 6, testFramework: 'jasmine'}})
        .on('end', done);
    });
    it('test contains Jasmine syntax', function() {
      assert.fileContent('app/scripts/apps/batman_and_robin/batman_and_robin_collection_test.js', /toBeTruthy/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('with URL', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['some_feature'])
        .withOptions({
          url: 'api/collection'
        })
        .withGenerators([path.join(__dirname, '../generators/model')])
        .on('end', done);
    });
    it('contains url', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection.js', /url: 'api\/collection'/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('with URL', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['some_feature'])
        .withOptions({
          url: 'api/collection',
          ecma: 6
        })
        .withGenerators([path.join(__dirname, '../generators/model')])
        .on('end', done);
    });
    it('contains url', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_collection.js', /url: 'api\/collection'/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('without existing model', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['other_feature'])
        .withOptions({ directory: 'other_feature' })
        .withGenerators([path.join(__dirname, '../generators/model')])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other_feature/other_feature_collection.js',
        'app/scripts/apps/other_feature/other_feature_collection_test.js'
      ]);
    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection.js', /.\/other_feature_model/);
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection.js', /, OtherFeatureModel/);
    });
    it('contains model Class', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection.js', /model: OtherFeatureModel/);
    });
  });

  describe('without existing model ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['other_feature'])
        .withLocalConfig({ preferences: { ecma: 6, tests: 'appcode' }})
        .withGenerators([path.join(__dirname, '../generators/model')])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other_feature/other_feature_collection.js',
        'app/scripts/apps/other_feature/other_feature_collection_test.js'
      ]);
    });
    it('contains model module dependency', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection.js', /import OtherFeatureModel from '.\/other_feature_model'/);
    });
    it('contains model Class', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection.js', /model: OtherFeatureModel/);
    });
    it('test imports collection module', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_test.js', /import OtherFeatureCollection from 'apps\/other_feature\/other_feature_collection'/);
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection_test.js', /new OtherFeatureCollection\(\)/);
    });
  });

  describe('with existing model, expanded dirs', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['other_feature'])
        .withOptions({
          directory: 'app/scripts/apps/other_feature',
          model: 'app/scripts/apps/vegetables/broccoli_model.js'
        })
        .on('end', done);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other_feature/other_feature_collection.js',
        'app/scripts/apps/other_feature/other_feature_collection_test.js'
      ]);
    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection.js', /apps\/vegetables\/broccoli_model/);
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection.js', /, BroccoliModel/);
    });
    it('contains model Class', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection.js', /model: BroccoliModel/);
    });
  });

  describe('with existing model, expanded dirs ES6', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['other_feature'])
        .withOptions({
          directory: 'app/scripts/apps/other_feature',
          model: 'app/scripts/apps/heroes/joker_model.js'
        })
        .withLocalConfig({preferences: {ecma: 6}})
        .on('end', done);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other_feature/other_feature_collection.js',
        'app/scripts/apps/other_feature/other_feature_collection_test.js'
      ]);
    });
    it('contains model module dependency', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection.js', /import JokerModel from 'apps\/heroes\/joker_model'/);
    });
    it('contains model Class', function() {
      assert.fileContent('app/scripts/apps/other_feature/other_feature_collection.js', /model: JokerModel/);
    });
  });

  describe('with tests in separate dir', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['other_feature'])
        .withLocalConfig({ preferences: { tests: 'custom', testFolder: 'test/' }})
        .withGenerators([path.join(__dirname, '../generators/model')])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other_feature/other_feature_collection.js',
        'test/apps/other_feature/other_feature_collection_test.js'
      ]);
    });
    it('test contains AMD path', function() {
      assert.fileContent('test/apps/other_feature/other_feature_collection_test.js', /other_feature_collection/);

    });
    it('test contains collection class', function() {
      assert.fileContent('test/apps/other_feature/other_feature_collection_test.js', /new OtherFeatureCollection()/);
    });
  });

  describe('with tests in separate dir ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['other_feature'])
        .withLocalConfig({preferences: { tests: 'custom', testFolder: 'test/', ecma: 6 }})
        .withGenerators([path.join(__dirname, '../generators/model')])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other_feature/other_feature_collection.js',
        'test/apps/other_feature/other_feature_collection_test.js'
      ]);
    });
    it('test contains import collection module', function() {
      assert.fileContent('test/apps/other_feature/other_feature_collection_test.js', /import OtherFeatureCollection from 'apps\/other_feature\/other_feature_collection'/);

    });
    it('test contains collection class', function() {
      assert.fileContent('test/apps/other_feature/other_feature_collection_test.js', /new OtherFeature()/);
    });
  });
});
