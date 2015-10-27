'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var os = require('os');
var chai = require('chai');
chai.use(require('chai-fs'));
var sinon = require('sinon');
var existTest = require('../generators/utils');
var fs = require('fs-extra');
var stub;

var assert = require('yeoman-generator').assert;

describe('mario:compositeview', function() {
  describe('without options', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/compositeview'))
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .withArguments(['apples'])
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/apples/apples_composite_view.js',
        'app/scripts/apps/apples/apples_composite_view_test.js',
        'app/scripts/apps/apples/apples_item_view.js',
        'app/scripts/apps/apples/apples_item_view_template.hbs'
      ]);
    });

    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/apples/apples_composite_view.js', /'.\/apples_item_view'/);
    });

    it('contains template', function() {
      assert.fileContent('app/scripts/apps/apples/apples_composite_view.js', /JST\['app\/scripts\/apps\/apples\/apples_composite_view_template.hbs']/);
    });

    it('test with right content ', function() {
      assert.fileContent('app/scripts/apps/apples/apples_composite_view_test.js', /.\/apples_composite_view/);
      assert.fileContent('app/scripts/apps/apples/apples_composite_view_test.js', /, ApplesCompositeView/);
      assert.fileContent('app/scripts/apps/apples/apples_composite_view_test.js', /new ApplesCompositeView/);
    });
  });

  describe('with options (dir, itemview, template)', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/compositeview'))
        .withArguments(['apples'])
        .inTmpDir(function(dir) {
          var done = this.async();
          var filePath = path.join(dir, 'app/scripts/apps/template', 'feature_template.hbs');
          fs.ensureFile(filePath, done);
        })
        .withOptions({
          directory: 'fruit',
          itemview: 'apple',
          template: 'template/feature_template.hbs'
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/fruit/apples_composite_view.js',
        'app/scripts/apps/fruit/apples_composite_view_test.js'
      ]);
    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_composite_view.js', /'.\/apple_item_view'/);
    });
    it('contains template', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_composite_view.js', /JST\['app\/scripts\/apps\/template\/feature_template.hbs']/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('without options ES6', function() {
      before(function(done) {
        helpers.run(path.join(__dirname, '../generators/compositeview'))
          .inDir(path.join(os.tmpdir(), './temp_test'))
          .withArguments(['apples'])
          .withOptions({ directory: 'fruit' })
          .withLocalConfig({ preferences: {ecma: 6 }})
          .withGenerators([path.join(__dirname, '../generators/itemview')])
          .on('end', done);
      });
      it('creates files', function() {
        assert.file([
          'app/scripts/apps/fruit/apples_composite_view.js',
          'app/scripts/apps/fruit/apples_composite_view_test.js'
        ]);
      });
      it('contains module dependency', function() {
        assert.fileContent('app/scripts/apps/fruit/apples_composite_view.js', /import ApplesItemView from '.\/apples_item_view'/);
      });
      it('contains template', function() {
        assert.fileContent('app/scripts/apps/fruit/apples_composite_view.js', /JST\['app\/scripts\/apps\/fruit\/apples_composite_view_template.hbs']/);
      });
      it('contains childView', function() {
        assert.fileContent('app/scripts/apps/fruit/apples_composite_view.js', /childView: ApplesItemView/);
      });
      it('test with right content ', function() {
        assert.fileContent('app/scripts/apps/fruit/apples_composite_view_test.js', /import ApplesCompositeView from 'apps\/fruit\/apples_composite_view/);
        assert.fileContent('app/scripts/apps/fruit/apples_composite_view_test.js', /describe\('ApplesCompositeView/);
        assert.fileContent('app/scripts/apps/fruit/apples_composite_view_test.js', /new ApplesCompositeView/);
      });
  });

  describe('with options (dir, itemview, template) ES6', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/compositeview'))
        .withArguments(['apples'])
        .inTmpDir(function(dir) {
          var done = this.async();
          var filePath = path.join(dir, 'app/scripts/apps/template', 'feature_template.hbs');
          fs.ensureFile(filePath, done);
        })
        .withOptions({
          directory: 'fruit',
          itemview: 'apple',
          template: 'template/feature_template.hbs'
        })
        .withLocalConfig({ preferences: {ecma: 6 }})
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/fruit/apples_composite_view.js',
        'app/scripts/apps/fruit/apples_composite_view_test.js'
      ]);
    });
    it('contains itemview module dependency', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_composite_view.js', /import AppleItemView from '.\/apple_item_view'/);
    });
    it('contains template', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_composite_view.js', /JST\['app\/scripts\/apps\/template\/feature_template.hbs']/);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });
  });

  describe('with existing itemview and optional dir using expanded paths', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/compositeview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['apples'])
        .withOptions({
          directory: 'app/scripts/apps/fruit',
          itemview: 'app/scripts/apps/vegetables/broccoli'
        })
        .on('end', done);
    });
    afterEach(function(done) {
      stub.restore();
      done();
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/fruit/apples_composite_view.js',
        'app/scripts/apps/fruit/apples_composite_view_test.js'
      ]);
    });
    it('contains AMD dependency', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_composite_view.js', /'apps\/vegetables\/broccoli_item_view'/);
    });
    it('contains template', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_composite_view.js', /JST\['app\/scripts\/apps\/fruit\/apples_composite_view_template.hbs']/);
    });
  });

  describe('with existing itemview and optional dir using expanded paths ES6', function() {
    before(function(done) {
      stub = sinon.stub(existTest, 'verifyPath', function() {
        return true;
      });
      helpers.run(path.join(__dirname, '../generators/compositeview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['apples'])
        .withOptions({
          directory: 'app/scripts/apps/fruit',
          itemview: 'app/scripts/apps/vegetables/broccoli_item_view.js',
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
        'app/scripts/apps/fruit/apples_composite_view.js',
        'app/scripts/apps/fruit/apples_composite_view_test.js'
      ]);
    });
    it('contains itemview module dependency', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_composite_view.js', /import BroccoliItemView from 'apps\/vegetables\/broccoli_item_view'/);
    });
    it('contains template', function() {
      assert.fileContent('app/scripts/apps/fruit/apples_composite_view.js', /JST\['app\/scripts\/apps\/fruit\/apples_composite_view_template.hbs']/);
    });
  });

  describe('with tests in separate dir', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/compositeview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['apples'])
        .withLocalConfig({preferences: {tests: 'custom', testFolder: 'test/'}})
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/apples/apples_composite_view.js',
        'test/apps/apples/apples_composite_view_test.js'
      ]);
    });
    it('test contains AMD path', function() {
      assert.fileContent('test/apps/apples/apples_composite_view_test.js', /apples_composite_view/);

    });
    it('test contains compositeview class', function() {
      assert.fileContent('test/apps/apples/apples_composite_view_test.js', /new ApplesCompositeView()/);
    });
  });

  describe('with tests in separate dir ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/compositeview'))
        .inDir(path.join(os.tmpdir(), './temp_test'))
        .withArguments(['apples'])
        .withLocalConfig({preferences: {tests: 'custom', testFolder: 'test/', ecma: 6}})
        .withGenerators([path.join(__dirname, '../generators/itemview')])
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'app/scripts/apps/apples/apples_composite_view.js',
        'test/apps/apples/apples_composite_view_test.js'
      ]);
    });
    it('test contains compositeview module', function() {
      assert.fileContent('test/apps/apples/apples_composite_view_test.js', /import ApplesCompositeView from 'apps\/apples\/apples_composite_view'/);

    });
    it('test contains compositeview class', function() {
      assert.fileContent('test/apps/apples/apples_composite_view_test.js', /new ApplesCompositeView()/);
    });
  });
});
