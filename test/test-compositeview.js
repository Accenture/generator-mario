'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var os = require('os');
var chai = require('chai');
chai.use(require('chai-fs'));
var sinon = require('sinon');
var existTest = require('../generators/utils');
var stub;

var assert = require('yeoman-generator').assert;

describe('aowp-marionette:compositeview without existing itemview', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/compositeview'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['apples'])
      .withOptions({
        directory: 'fruit'
      })
      .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:itemview']])
      .on('end', done);
  });
  it('creates files', function() {
    assert.file([
      'app/scripts/apps/fruit/apples-composite-view.js',
      'app/scripts/apps/fruit/apples-composite-view-test.js'
    ]);
  });
  it('contains AMD dependency', function() {
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view.js', /'.\/apples-item-view'/);
  });
  it('contains template', function() {
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view.js', /JST\['app\/scripts\/apps\/fruit\/apples-composite-view-template.hbs']/);
  });
  it('test with right content ', function() {
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view-test.js', /.\/apples-composite-view/);
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view-test.js', /, ApplesCompositeView/);
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view-test.js', /new ApplesCompositeView/);
  });
});

describe('aowp-marionette:compositeview with existing itemview', function() {
  before(function(done) {
    stub = sinon.stub(existTest, 'verifyPath', function() {
      return true;
    });
    helpers.run(path.join(__dirname, '../generators/compositeview'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['apples'])
      .withOptions({
        directory: 'fruit',
        itemview: 'apple'
      })
      .on('end', done);
  });

  it('creates files', function() {
    assert.file([
      'app/scripts/apps/fruit/apples-composite-view.js',
      'app/scripts/apps/fruit/apples-composite-view-test.js'
    ]);
  });
  it('contains AMD dependency', function() {
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view.js', /'.\/apple-item-view'/);
  });
  it('contains template', function() {
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view.js', /JST\['app\/scripts\/apps\/fruit\/apples-composite-view-template.hbs']/);
  });
  afterEach(function(done) {
    stub.restore();
    done();
  });
});

describe('aowp-marionette:compositeview ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/compositeview'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments(['apples'])
        .withOptions({
          directory: 'fruit',
          ecma: 6
        })
        .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:itemview']])
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'app/scripts/apps/fruit/apples-composite-view.js',
        'app/scripts/apps/fruit/apples-composite-view-test.js'
      ]);
    });
    it('contains module dependency', function() {
      assert.fileContent('app/scripts/apps/fruit/apples-composite-view.js', /import ApplesItemView from '.\/apples-item-view'/);
    });
    it('contains template', function() {
      assert.fileContent('app/scripts/apps/fruit/apples-composite-view.js', /JST\['app\/scripts\/apps\/fruit\/apples-composite-view-template.hbs']/);
    });
    it('contains childView', function() {
      assert.fileContent('app/scripts/apps/fruit/apples-composite-view.js', /childView: ApplesItemView/);
    });
    it('test with right content ', function() {
      assert.fileContent('app/scripts/apps/fruit/apples-composite-view-test.js', /import ApplesCompositeView from 'apps\/fruit\/apples-composite-view/);
      assert.fileContent('app/scripts/apps/fruit/apples-composite-view-test.js', /describe\('ApplesCompositeView/);
      assert.fileContent('app/scripts/apps/fruit/apples-composite-view-test.js', /new ApplesCompositeView/);
    });
});

describe('aowp-marionette:compositeview with existing itemview and optional dir using expanded paths', function() {
  before(function(done) {
    stub = sinon.stub(existTest, 'verifyPath', function() {
      return true;
    });
    helpers.run(path.join(__dirname, '../generators/compositeview'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
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
      'app/scripts/apps/fruit/apples-composite-view.js',
      'app/scripts/apps/fruit/apples-composite-view-test.js'
    ]);
  });
  it('contains AMD dependency', function() {
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view.js', /'apps\/vegetables\/broccoli-item-view'/);
  });
  it('contains template', function() {
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view.js', /JST\['app\/scripts\/apps\/fruit\/apples-composite-view-template.hbs']/);
  });
});

describe('aowp-marionette:compositeview with tests in separate dir', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/compositeview'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['apples'])
      .withOptions({
        tests: 'separate'
      })
      .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:itemview']])
      .on('end', done);
  });
  it('creates files', function() {
    assert.file([
      'app/scripts/apps/apples/apples-composite-view.js',
      'test/apps/apples/apples-composite-view-test.js'
    ]);
  });
});
