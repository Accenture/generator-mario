'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var os = require('os');
var chai = require('chai');
var expect = require('chai').expect;
chai.use(require('chai-fs'));

describe('aowp-marionette:layoutview', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/layoutview'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['apples'])
      .withOptions({
        directory: 'fruit'
      })
      .on('end', done);
  });

  it('creates files', function () {
    expect('app/scripts/apps/fruit/apples-layout-view.js').to.be.a.file();
    expect('app/scripts/apps/fruit/apples-layout-view-test.js').to.be.a.file();
  });
});
