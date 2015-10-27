'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var os = require('os');
var chai = require('chai');
chai.use(require('chai-fs'));
var assert = require('yeoman-generator').assert;
var sinon = require('sinon');
var existTest = require('../generators/utils');
var fs = require('fs-extra');
var stub;

describe('mario:layoutview', function() {

  describe('without template option', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/layoutview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['apples'])
        .withOptions({ directory: 'fruit' })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/fruit/apples_layout_view.js',
        'app/scripts/apps/fruit/apples_layout_view_test.js'
      ]);
    });
    it('contains template', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_layout_view.js', /JST\['app\/scripts\/apps\/fruit\/apples_layout_view_template.hbs']/);
    });
    it('test with right content', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_layout_view_test.js', /.\/apples_layout_view/);
      assert.fileContent('app/scripts/apps/fruit/apples_layout_view_test.js', /, ApplesLayoutView/);
      assert.fileContent('app/scripts/apps/fruit/apples_layout_view_test.js', /new ApplesLayoutView/);
    });
  });

  describe('without template option ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/layoutview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['apples'])
        .withOptions({ directory: 'fruit' })
        .withLocalConfig({preferences: {ecma: 6}})
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/fruit/apples_layout_view.js',
        'app/scripts/apps/fruit/apples_layout_view_test.js'
      ]);
    });
    it('contains template', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_layout_view.js', /JST\['app\/scripts\/apps\/fruit\/apples_layout_view_template.hbs']/);
    });
    it('test with right content', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_layout_view_test.js', /import ApplesLayoutView from 'apps\/fruit\/apples_layout_view'/);
      assert.fileContent('app/scripts/apps/fruit/apples_layout_view_test.js', /describe\('ApplesLayoutView view/);
      assert.fileContent('app/scripts/apps/fruit/apples_layout_view_test.js', /new ApplesLayoutView/);
    });
  });

  describe('with options (directory, template)', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/layoutview'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var filePath = path.join(dir, 'app/scripts/apps/template', 'feature_template.hbs');
          fs.ensureFile(filePath, done);
        })
        .withArguments(['apples'])
        .withOptions({
          directory: 'app/scripts/apps/fruit',
          template: 'template/feature_template.hbs'
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/fruit/apples_layout_view.js',
        'app/scripts/apps/fruit/apples_layout_view_test.js'
      ]);

      assert.noFile('app/scripts/apps/fruit/apples_layout_template.js');
    });
    it('contains template', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_layout_view.js', /JST\['app\/scripts\/apps\/template\/feature_template.hbs']/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('with options (directory, template) ES6', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/layoutview'))
        .inTmpDir(function(dir) {
          var done = this.async();
          var filePath = path.join(dir, 'app/scripts/apps/template', 'feature_template.hbs');
          fs.ensureFile(filePath, done);
        })
        .withArguments(['apples'])
        .withOptions({
          directory: 'app/scripts/apps/fruit',
          template: 'template/feature_template.hbs'
        })
        .withLocalConfig({preferences: {ecma: 6}})
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/fruit/apples_layout_view.js',
        'app/scripts/apps/fruit/apples_layout_view_test.js'
      ]);

      assert.noFile('app/scripts/apps/fruit/apples_layout_template.js');
    });
    it('contains template', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_layout_view.js', /JST\['app\/scripts\/apps\/template\/feature_template.hbs']/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('with tests in separate dir', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/layoutview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['apples'])
        .withLocalConfig({preferences: {tests: 'custom', testFolder: 'test/'}})
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/apples/apples_layout_view.js',
        'test/apps/apples/apples_layout_view_test.js'
      ]);
    });
  });

  describe('with tests in separate dir ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/layoutview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['apples'])
        .withLocalConfig({preferences: {tests: 'custom', testFolder: 'test/'}})
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/apples/apples_layout_view.js',
        'test/apps/apples/apples_layout_view_test.js'
      ]);
    });
  });
});
