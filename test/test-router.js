'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var existTest = require('../generators/utils');
var stub;

describe('aowp-marionette:collection with existing controller', function() {
  before(function(done) {
    stub = sinon.stub(existTest, 'verifyPath', function() {
      return true;
    });
    helpers.run(path.join(__dirname, '../generators/router'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['some-feature'])
      .withOptions({
        directory: 'some-feature',
        controller: 'some-controller'
      })
      .on('end', done);
  });
  it('creates files', function() {
    assert.file([
      'app/scripts/apps/some-feature/some-feature-router.js'
    ]);
  });
  it('contains AMD dependency', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /'.\/some-controller'/);
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /, SomeController/);
  });
  it('contains controller class', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /new SomeController/);
  });
  afterEach(function(done) {
    stub.restore();
    done();
  });
});

describe('aowp-marionette:router without existing controller expanded dirs', function() {
  before(function(done) {
    stub = sinon.stub(existTest, 'verifyPath', function() {
      return true;
    });
    helpers.run(path.join(__dirname, '../generators/router'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['some-feature'])
      .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:controller']])
      .withOptions({
        directory: 'app/scripts/apps/some-feature',
        controller: 'app/scripts/apps/vegetables/broccoli-controller.js'
      })
      .on('end', done);
  });
  afterEach(function(done) {
    stub.restore();
    done();
  });
  it('creates files', function() {
    assert.file([
      'app/scripts/apps/some-feature/some-feature-router.js'
    ]);
  });
  it('contains AMD dependency', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /'apps\/vegetables\/broccoli-controller'/);
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /, BroccoliController/);
  });
  it('contains controller class', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /new BroccoliController/);
  });
});

describe('aowp-marionette:router es6', function() {
  before(function(done) {
    stub = sinon.stub(existTest, 'verifyPath', function() {
      return true;
    });
    helpers.run(path.join(__dirname, '../generators/router'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['some-feature'])
      .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:controller']])
      .withOptions({
        directory: 'app/scripts/apps/some-feature',
        controller: 'app/scripts/apps/vegetables/broccoli-controller.js',
        ecma: 6
      })
      .on('end', done);
  });
  afterEach(function(done) {
    stub.restore();
    done();
  });
  it('creates files', function() {
    assert.file([
      'app/scripts/apps/some-feature/some-feature-router.js'
    ]);
  });
  it('contains module dependency', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /import BroccoliController from 'apps\/vegetables\/broccoli-controller'/);
  });
  it('contains route', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-router.js', /'some-feature': 'default'/);
  });
});
