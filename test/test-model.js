'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('aowp-marionette:model', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/model'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['some-feature'])
      .withOptions({
        directory: 'some-feature'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/scripts/apps/some-feature/some-feature-model.js',
      'app/scripts/apps/some-feature/some-feature-model-test.js'
    ]);
  });
  it('test contains AMD path', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-model-test.js', /some-feature-model/);
  });
  it('test contains class', function() {
    assert.fileContent('app/scripts/apps/some-feature/some-feature-model-test.js', /(SomeFeatureModel)/);
    assert.fileContent('app/scripts/apps/some-feature/some-feature-model-test.js', /new SomeFeatureModel()/);
  });


  });
