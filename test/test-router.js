'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var existTest = require('../generators/utils');
var stub;

describe('mario:router', function() {
  describe('without options', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/router'))
        .withArguments(['some_feature'])
        .withGenerators([path.join(__dirname, '../generators/controller')])
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .on('end', done);
    });

    it('create file', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_router.js',
        'app/scripts/apps/some_feature/some_feature_controller.js'
      ]);
    });

    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /'.\/some_feature_controller'/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /, SomeFeatureController/);
    });
    it('contains controller class', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /new SomeFeatureController/);
    });

    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('without options ES6', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/router'))
        .withArguments(['some_feature'])
        .withGenerators([path.join(__dirname, '../generators/controller')])
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withLocalConfig({preferences: {ecma: 6}})
        .on('end', done);
    });

    it('create file', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_router.js',
        'app/scripts/apps/some_feature/some_feature_controller.js'
      ]);
    });

    it('contains controller module dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /import SomeFeatureController from '.\/some_feature_controller'/);
    });
    it('contains controller class', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /new SomeFeatureController/);
    });

    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('with existing controller', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/router'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withOptions({
          directory: 'some_feature',
          controller: 'some_controller'
        })
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_router.js'
      ]);
    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /'.\/some_controller'/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /, SomeController/);
    });
    it('contains controller class', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /new SomeController/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('with existing controller ES6', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/router'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withOptions({
          directory: 'some_feature',
          controller: 'some_controller'
        })
        .withLocalConfig({preferences: {ecma: 6}})
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_router.js'
      ]);
    });
    it('contains controller module dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /import SomeController from '.\/some_controller'/);
    });
    it('contains controller class', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /new SomeController/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('with existing controller expanded dirs', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/router'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withGenerators([path.join(__dirname, '../generators/controller')])
        .withOptions({
          directory: 'app/scripts/apps/some_feature',
          controller: 'app/scripts/apps/vegetables/broccoli_controller.js'
        })
        .on('end', done);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_router.js'
      ]);
    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /'apps\/vegetables\/broccoli_controller'/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /, BroccoliController/);
    });
    it('contains controller class', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /new BroccoliController/);
    });
  });

  describe('with existing controller expanded dirs ES6', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/router'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withGenerators([path.join(__dirname, '../generators/controller')])
        .withOptions({
          directory: 'app/scripts/apps/some_feature',
          controller: 'app/scripts/apps/vegetables/broccoli_controller.js'
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
        'app/scripts/apps/some_feature/some_feature_router.js'
      ]);
    });
    it('contains module dependency', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /import BroccoliController from 'apps\/vegetables\/broccoli_controller'/);
    });
    it('contains route', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_router.js', /'some_feature': 'default'/);
    });
  });
});
