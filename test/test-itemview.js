'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('aowp-marionette:itemview ', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/itemview'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['some-feature'])
      .withOptions({
        directory: 'some-feature'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/scripts/apps/some-feature/some-feature-item-view.js',
      'app/scripts/apps/some-feature/some-feature-item-view.js'
    ]);
  });
  it('contains template', function () {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-item-view.js', /JST\['app\/scripts\/apps\/some-feature\/some-feature-item-view-template.hbs'\]/);
  });
  it('test with content', function () {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-item-view-test.js', /.\/some-feature-item-view/);
    assert.fileContent('app/scripts/apps/some-feature/some-feature-item-view-test.js', /, SomeFeatureItemView/);
    assert.fileContent('app/scripts/apps/some-feature/some-feature-item-view-test.js', /new SomeFeatureItemView/);
  });
});
