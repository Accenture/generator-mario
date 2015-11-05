'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs-extra');

describe('mario:itemview ', function() {
  describe('without options', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/itemview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withLocalConfig({preferences: {ecma: 5, testFramework: 'mocha'}})
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_item_view.js',
        'app/scripts/apps/some_feature/some_feature_item_view_test.js',
        'app/scripts/apps/some_feature/some_feature_item_view_template.hbs'
      ]);
    });
    it('contains template', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_item_view.js', /JST\['app\/scripts\/apps\/some_feature\/some_feature_item_view_template.hbs'\]/);
    });
    it('test with content', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_item_view_test.js', /.\/some_feature_item_view/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_item_view_test.js', /, SomeFeatureItemView/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_item_view_test.js', /new SomeFeatureItemView/);
    });
    it('test contains Mocha syntax', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_item_view_test.js', /text\(\)\).to\.equal\('1'\)/);
    });
  });

  describe('without options', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/itemview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withLocalConfig({preferences: {ecma: 5, testFramework: 'jasmine'}})
        .on('end', done);
    });
    it('test contains Jasmine syntax', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_item_view_test.js', /text\(\)\).toEqual\('1'\)/);
    });
  });

  describe('without options ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/itemview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withLocalConfig({preferences: {ecma: 6, testFramework: 'mocha'}})
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_item_view.js',
        'app/scripts/apps/some_feature/some_feature_item_view_test.js',
        'app/scripts/apps/some_feature/some_feature_item_view_template.hbs'
      ]);
    });
    it('contains template', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_item_view.js', /JST\['app\/scripts\/apps\/some_feature\/some_feature_item_view_template.hbs'\]/);
    });
    it('test with content', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_item_view_test.js', /import  SomeFeatureItemView from 'apps\/some_feature\/some_feature_item_view'/);
      assert.fileContent('app/scripts/apps/some_feature/some_feature_item_view_test.js', /new SomeFeatureItemView/);
    });
    it('test contains Mocha syntax', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_item_view_test.js', /text\(\)\).to\.equal\('Home'\)/);
    });
  });

  describe('without options ES6 + Jasmine', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/itemview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withLocalConfig({preferences: {ecma: 6, testFramework: 'jasmine'}})
        .on('end', done);
    });
    it('test contains Mocha syntax', function() {
      assert.fileContent('app/scripts/apps/some_feature/some_feature_item_view_test.js', /text\(\)\).toEqual\('Home'\)/);
    });
  });

  describe('with options (template, dir)', function() {
    var FEATURE = 'other_feature';
    var PATH_WITH_PREFIX = 'app/scripts/apps/' + FEATURE + '/' + FEATURE;

    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/itemview'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var filePath = path.join(dir, 'app/scripts/apps/template', 'feature_template.hbs');
          fs.ensureFile(filePath, done);
        })
        .withArguments([FEATURE])
        .withOptions({
          template: 'template/feature_template.hbs',
          directory: 'app/scripts/apps/' + FEATURE
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        PATH_WITH_PREFIX + '_item_view_test.js',
        PATH_WITH_PREFIX + '_item_view.js'
      ]);
      assert.noFile('PATH_WITH_PREFIX' + '_item_view_template.hbs');
    });
    it('contains template', function() {
      assert.fileContent(PATH_WITH_PREFIX + '_item_view.js', /JST\['app\/scripts\/apps\/template\/feature_template.hbs'\]/);
    });
    it('test with content', function() {
      assert.fileContent(PATH_WITH_PREFIX + '_item_view_test.js', /.\/other_feature_item_view/);
      assert.fileContent(PATH_WITH_PREFIX + '_item_view_test.js', /, OtherFeatureItemView/);
      assert.fileContent(PATH_WITH_PREFIX + '_item_view_test.js', /new OtherFeatureItemView/);
    });
  });

  describe('with options (template, dir) ES6', function() {
    var FEATURE = 'other_feature';
    var PATH_WITH_PREFIX = 'app/scripts/apps/' + FEATURE + '/' + FEATURE;

    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/itemview'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var filePath = path.join(dir, 'app/scripts/apps/template', 'feature_template.hbs');
          fs.ensureFile(filePath, done);
        })
        .withArguments([FEATURE])
        .withOptions({
          template: 'template/feature_template.hbs',
          directory: 'app/scripts/apps/' + FEATURE
        })
        .withLocalConfig({preferences: {ecma: 6}})
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        PATH_WITH_PREFIX + '_item_view_test.js',
        PATH_WITH_PREFIX + '_item_view.js'
      ]);
      assert.noFile('PATH_WITH_PREFIX' + '_item_view_template.hbs');
    });
    it('contains template', function() {
      assert.fileContent(PATH_WITH_PREFIX + '_item_view.js', /JST\['app\/scripts\/apps\/template\/feature_template.hbs'\]/);
    });
    it('test with content', function() {
      assert.fileContent(PATH_WITH_PREFIX + '_item_view_test.js', /import  OtherFeatureItemView from 'apps\/other_feature\/other_feature_item_view'/);
      assert.fileContent(PATH_WITH_PREFIX + '_item_view_test.js', /new OtherFeatureItemView/);
    });
  });

  describe('with tests in separate dir', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/itemview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withLocalConfig({preferences: {tests: 'custom', testFolder: 'test/'}})
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_item_view.js',
        'test/apps/some_feature/some_feature_item_view_test.js',
        'app/scripts/apps/some_feature/some_feature_item_view_template.hbs'
      ]);
    });
  });

  describe('with tests in separate dir ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/itemview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['some_feature'])
        .withLocalConfig({preferences: {tests: 'custom', testFolder: 'test/', ecma: 6}})
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/some_feature/some_feature_item_view.js',
        'test/apps/some_feature/some_feature_item_view_test.js',
        'app/scripts/apps/some_feature/some_feature_item_view_template.hbs'
      ]);
    });
  });
});
