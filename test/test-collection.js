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
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['some-feature'])
        .withOptions({
          directory: 'some-feature',
          model: 'some-model'
        })
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some-feature/some-feature-collection.js',
        'app/scripts/apps/some-feature/some-feature-collection-test.js'
      ]);
    });
    it('view contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection.js', /.\/some-model/);
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection.js', /, SomeModel/);
    });
    it('view contains model Class', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection.js', /model: SomeModel/);
    });
    it('test contains AMD path', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-test.js', /some-feature-collection/);

    });
    it('test contains class', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-test.js', /new SomeFeatureCollection()/);
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
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['batman-and-robin'])
        .withOptions({
          ecma: 6,
          model: 'harlequin-model'
        })
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/batman-and-robin/batman-and-robin-collection.js',
        'app/scripts/apps/batman-and-robin/batman-and-robin-collection-test.js'
      ]);
    });
    it('view contains model module dependency', function() {
      assert.fileContent('app/scripts/apps/batman-and-robin/batman-and-robin-collection.js', /import HarlequinModel from '.\/harlequin-model'/);
    });
    it('view contains model Class', function() {
      assert.fileContent('app/scripts/apps/batman-and-robin/batman-and-robin-collection.js', /model: HarlequinModel/);
    });
    it('test contains collection module', function() {
      assert.fileContent('app/scripts/apps/batman-and-robin/batman-and-robin-collection-test.js', /import BatmanAndRobinCollection from 'apps\/batman-and-robin\/batman-and-robin-collection'/);

    });
    it('test contains collection class', function() {
      assert.fileContent('app/scripts/apps/batman-and-robin/batman-and-robin-collection-test.js', /new BatmanAndRobin()/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('without existing model', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['other-feature'])
        .withOptions({
          directory: 'other-feature'
        })
        .withGenerators([path.join(__dirname, '../generators/model')])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other-feature/other-feature-collection.js',
        'app/scripts/apps/other-feature/other-feature-collection-test.js'
      ]);
    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /.\/other-feature-model/);
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /, OtherFeatureModel/);
    });
    it('contains model Class', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /model: OtherFeatureModel/);
    });
  });

  describe('without existing model ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['other-feature'])
        .withOptions({
          ecma: 6,
          tests: 'appcode'
        })
        .withGenerators([path.join(__dirname, '../generators/model')])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other-feature/other-feature-collection.js',
        'app/scripts/apps/other-feature/other-feature-collection-test.js'
      ]);
    });
    it('contains model module dependency', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /import OtherFeatureModel from '.\/other-feature-model'/);
    });
    it('contains model Class', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /model: OtherFeatureModel/);
    });
    it('test imports collection module', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-test.js', /import OtherFeatureCollection from 'apps\/other-feature\/other-feature-collection'/);
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection-test.js', /new OtherFeatureCollection\(\)/);
    });
  });

  describe('with existing model, expanded dirs', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['other-feature'])
        .withOptions({
          directory: 'app/scripts/apps/other-feature',
          model: 'app/scripts/apps/vegetables/broccoli-model.js'
        })
        .on('end', done);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other-feature/other-feature-collection.js',
        'app/scripts/apps/other-feature/other-feature-collection-test.js'
      ]);
    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /apps\/vegetables\/broccoli-model/);
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /, BroccoliModel/);
    });
    it('contains model Class', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /model: BroccoliModel/);
    });
  });

  describe('with existing model, expanded dirs ES6', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['other-feature'])
        .withOptions({
          directory: 'app/scripts/apps/other-feature',
          ecma: 6,
          model: 'app/scripts/apps/heroes/joker-model.js'
        })
        .on('end', done);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other-feature/other-feature-collection.js',
        'app/scripts/apps/other-feature/other-feature-collection-test.js'
      ]);
    });
    it('contains model module dependency', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /import JokerModel from 'apps\/heroes\/joker-model'/);
    });
    it('contains model Class', function() {
      assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /model: JokerModel/);
    });
  });

  describe('with tests in separate dir', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['other-feature'])
        .withOptions({
          tests: 'separate'
        })
        .withGenerators([path.join(__dirname, '../generators/model')])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other-feature/other-feature-collection.js',
        'test/apps/other-feature/other-feature-collection-test.js'
      ]);
    });
    it('test contains AMD path', function() {
      assert.fileContent('test/apps/other-feature/other-feature-collection-test.js', /other-feature-collection/);

    });
    it('test contains collection class', function() {
      assert.fileContent('test/apps/other-feature/other-feature-collection-test.js', /new OtherFeatureCollection()/);
    });
  });

  describe('with tests in separate dir ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/collection'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['other-feature'])
        .withOptions({
          tests: 'separate',
          ecma: 6
        })
        .withGenerators([path.join(__dirname, '../generators/model')])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/other-feature/other-feature-collection.js',
        'test/apps/other-feature/other-feature-collection-test.js'
      ]);
    });
    it('test contains import collection module', function() {
      assert.fileContent('test/apps/other-feature/other-feature-collection-test.js', /import OtherFeatureCollection from 'apps\/other-feature\/other-feature-collection'/);

    });
    it('test contains collection class', function() {
      assert.fileContent('test/apps/other-feature/other-feature-collection-test.js', /new OtherFeature()/);
    });
  });
});
