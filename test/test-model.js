'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('mario:model', function() {
  describe('with tests', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/model'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['some-feature'])
        .withOptions({
          directory: 'some-feature',
          tests: 'appcode'
        })
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some-feature/some-feature-model.js',
        'app/scripts/apps/some-feature/some-feature-model-test.js'
      ]);
    });
    it('test contains module import', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-model-test.js', /some-feature-model/);
    });
    it('test contains class', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-model-test.js', /(SomeFeatureModel)/);
      assert.fileContent('app/scripts/apps/some-feature/some-feature-model-test.js', /new SomeFeatureModel()/);
    });
  });

  describe('with tests ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/model'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['some-feature'])
        .withOptions({
          tests: 'appcode',
          ecma: 6
        })
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some-feature/some-feature-model.js',
        'app/scripts/apps/some-feature/some-feature-model-test.js'
      ]);
    });
    it('test contains ES6 import', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-model-test.js', /import SomeFeatureModel from 'apps\/some-feature\/some-feature-model'/);
    });
    it('test contains name & class', function() {
      assert.fileContent('app/scripts/apps/some-feature/some-feature-model-test.js', /describe\('SomeFeatureModel'/);
      assert.fileContent('app/scripts/apps/some-feature/some-feature-model-test.js', /let model = new SomeFeatureModel()/);
    });
  });

  describe('with separate tests', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/model'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['some-feature'])
        .withOptions({
          tests: 'separate'
        })
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some-feature/some-feature-model.js',
        'test/apps/some-feature/some-feature-model-test.js'
      ]);
    });
  });

  describe('with separate tests ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/model'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['some-feature'])
        .withOptions({
          tests: 'separate',
          ecma: 6
        })
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some-feature/some-feature-model.js',
        'test/apps/some-feature/some-feature-model-test.js'
      ]);
    });
  });
});
