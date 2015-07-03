'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('aowp-marionette:controller', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/controller'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['my-controller'])
      .withOptions({
        directory: 'some-feature'
      })
      .on('end', done);
  });
  it('creates files', function () {
    assert.file([
      'app/scripts/apps/some-feature/my-controller.js'
    ]);
  });
});
