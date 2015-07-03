'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var os = require('os');
var chai = require('chai');
chai.use(require('chai-fs'));

var assert = require('yeoman-generator').assert;

describe('aowp-marionette:compositeview without existing itemview', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/compositeview'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['apples'])
      .withOptions({
        directory: 'fruit'
      })
      .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:itemview']])
      .on('end', done);
  });
  it('creates files', function () {
    assert.file([
      'app/scripts/apps/fruit/apples-composite-view.js',
      'app/scripts/apps/fruit/apples-composite-view-test.js'
    ]);
  });
  it('contains AMD dependency', function () {
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view.js', /'.\/apples-item-view'/);
  });
  it('contains template', function () {
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view.js', /JST\['app\/scripts\/apps\/fruit\/apples-composite-view-template.hbs']/);
  });
  it('test with right content ', function () {
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view-test.js', /.\/apples-composite-view/);
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view-test.js', /, ApplesCompositeView/);
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view-test.js', /new ApplesCompositeView/);
  });
});

describe('aowp-marionette:compositeview with existing itemview', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/compositeview'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['apples'])
      .withOptions({
        directory: 'fruit',
        itemview: 'apple'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/scripts/apps/fruit/apples-composite-view.js',
      'app/scripts/apps/fruit/apples-composite-view-test.js'
    ]);
  });
  it('contains AMD dependency', function () {
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view.js', /'.\/apple-item-view'/);
  });
  it('contains template', function () {
    assert.fileContent('app/scripts/apps/fruit/apples-composite-view.js', /JST\['app\/scripts\/apps\/fruit\/apples-composite-view-template.hbs']/);
  });
});
