'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var os = require('os');
var chai = require('chai');
var expect = require('chai').expect;
chai.use(require('chai-fs'));

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
    expect('app/scripts/apps/fruit/apples-composite-view.js').to.be.a.file();
    expect('app/scripts/apps/fruit/apples-composite-view-test.js').to.be.a.file();
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
    expect('app/scripts/apps/fruit/apples-composite-view.js').to.be.a.file();
    expect('app/scripts/apps/fruit/apples-composite-view-test.js').to.be.a.file();
  });
});
