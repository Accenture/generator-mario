'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('mario:model', function() {
  describe('with tests', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/model'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withOptions({ directory: 'some_feature' })
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_model.js',
        'app/scripts/apps/some_feature/some_feature_model_test.js'
      ]);
    });
    it('test contains module import', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_model_test.js', /some_feature_model/);
    });
    it('test contains class', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_model_test.js', /(SomeFeatureModel)/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_model_test.js', /new SomeFeatureModel()/);
    });
  });

  describe('with tests ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/model'))
        .withArguments(['some_feature'])
        .withLocalConfig({preferences: {tests: 'appcode', ecma: 6}})
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_model.js',
        'app/scripts/apps/some_feature/some_feature_model_test.js'
      ]);
    });
    it('test contains ES6 import', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_model_test.js', /import SomeFeatureModel from 'apps\/some_feature\/some_feature_model'/);
    });
    it('test contains name & class', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_model_test.js', /describe\('SomeFeatureModel'/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_model_test.js', /let model = new SomeFeatureModel()/);
    });
  });

  describe('with separate tests', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/model'))
        .withArguments(['some_feature'])
        .withLocalConfig({preferences: {tests: 'custom', testFolder: 'test/'}})
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_model.js',
        'test/apps/some_feature/some_feature_model_test.js'
      ]);
    });
  });

  describe('with separate tests ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/model'))
        .withArguments(['some_feature'])
        .withLocalConfig({preferences: {tests: 'custom', testFolder: 'test/', ecma: 6}})
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_model.js',
        'test/apps/some_feature/some_feature_model_test.js'
      ]);
    });
  });
});
