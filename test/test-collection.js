'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var sinon = require('sinon');
var os = require('os');
var existTest = require('../generators/path-verification');
var stub;

describe('aowp-marionette:collection with existing model', function () {
  before(function (done) {
    stub = sinon.stub(existTest, 'verifyPath', function () {
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
  it('creates files', function () {
    assert.file([
      'app/scripts/apps/some-feature/some-feature-collection.js',
      'app/scripts/apps/some-feature/some-feature-collection-test.js'
    ]);
  });
  it('view contains AMD dependency', function () {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection.js', /.\/some-model/);
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection.js', /, SomeModel/);
  });
  it('view contains model Class', function () {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection.js', /model: SomeModel/);
  });
  it('test contains AMD path', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-test.js', /some-feature-collection/);

  });
  it('test contains class', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-collection-test.js', /new SomeFeatureCollection()/);
  });
  afterEach(function(done){
    stub.restore();
    done();
  });
});

describe('collection without existing model', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/collection'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['other-feature'])
      .withOptions({
        directory: 'other-feature'
      })
      .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:model']])
      .on('end', done);
  });
  it('creates files', function () {
    assert.file([
      'app/scripts/apps/other-feature/other-feature-collection.js',
      'app/scripts/apps/other-feature/other-feature-collection-test.js'
    ]);
  });
  it('contains AMD dependency', function () {
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /.\/other-feature-model/);
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /, OtherFeatureModel/);
  });
  it('contains model Class', function () {
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /model: OtherFeatureModel/);
  });
});

describe('collection with existing model, expanded dirs', function () {
  before(function (done) {
    stub = sinon.stub(existTest, 'verifyPath', function () {
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
  afterEach(function(done){
    stub.restore();
    done();
  });
  it('creates files', function () {
    assert.file([
      'app/scripts/apps/other-feature/other-feature-collection.js',
      'app/scripts/apps/other-feature/other-feature-collection-test.js'
    ]);
  });
  it('contains AMD dependency', function () {
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /apps\/vegetables\/broccoli-model/);
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /, BroccoliModel/);
  });
  it('contains model Class', function () {
    assert.fileContent('app/scripts/apps/other-feature/other-feature-collection.js', /model: BroccoliModel/);
  });
});

describe('collection with tests in separate dir', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/collection'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['other-feature'])
      .withOptions({
        tests: 'separate'
      })
      .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:model']])
      .on('end', done);
  });
  it('creates files', function () {
    assert.file([
      'app/scripts/apps/other-feature/other-feature-collection.js',
      'test/apps/other-feature/other-feature-collection-test.js'
    ]);
  });
});
