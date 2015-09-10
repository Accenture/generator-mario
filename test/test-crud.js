'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs-extra');

describe('aowp-marionette:crud', function() {
  var crudFiles = [
    'app/scripts/apps/my-crud/my-crud-router.js',
    'app/scripts/apps/my-crud/my-crud-controller.js',
    'app/scripts/apps/my-crud/my-crud-collection.js',

    'app/scripts/apps/my-crud/my-crud-item-view.js',
    'app/scripts/apps/my-crud/my-crud-item-view-template.hbs',

    'app/scripts/apps/my-crud/my-crud-composite-view.js',
    'app/scripts/apps/my-crud/my-crud-composite-view-template.hbs',

    'app/scripts/apps/my-crud/my-crud-detail-item-view.js',
    'app/scripts/apps/my-crud/my-crud-detail-item-view-template.hbs',

    'app/scripts/apps/my-crud/my-crud-create-item-view.js',
    'app/scripts/apps/my-crud/my-crud-create-item-view-template.hbs',

    'app/scripts/apps/sidebar'
  ];

  describe('es5 version should', function() {

    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/crud'))
        .inTmpDir(function(dir) {
          var copyDone = this.async();
          var srcPath = path.join(__dirname, '../generators/app/templates/es5/app/scripts/app.js');
          var destPath = path.join(dir, '/app/scripts/app.js');

          fs.copy(srcPath, destPath, copyDone);
        })
        .withArguments(['my-crud'])
        .withOptions({ force: true })
        .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:model']])
        .on('end', done);
    });

    it('create files', function() {
      assert.file(crudFiles);
    });

    it('registers router', function() {
      assert.fileContent('app/scripts/app.js', /'apps\/my-crud\/my-crud-router'/);
      assert.fileContent('app/scripts/app.js', /, MyCrudRouter/);
      assert.fileContent('app/scripts/app.js', /new MyCrudRouter\(\{/);

      assert.noFileContent('app/scripts/app.js', /import/);
    });

    it('register sidebar', function() {
      assert.fileContent('app/scripts/app.js', /'apps\/sidebar\/sidebar-controller'/);
      assert.fileContent('app/scripts/app.js', /, SidebarController/);
      assert.fileContent('app/scripts/app.js', /new SidebarController\(\{/);
    });

  });

  describe('es6 version should', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/crud'))
        .inTmpDir(function(dir) {
          var copyDone = this.async();
          var srcPath = path.join(__dirname, '../generators/app/templates/es6/app/scripts/app.js');
          var destPath = path.join(dir, '/app/scripts/app.js');

          fs.copy(srcPath, destPath, copyDone);
        })
        .withArguments(['my-crud'])
        .withOptions({ ecma: 6, force: true })
        .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:model']])
        .on('end', done);
    });

    it('create files', function() {
      assert.file(crudFiles);
    });

    it('registers router', function() {
      assert.fileContent('app/scripts/app.js', /import/);

      assert.fileContent('app/scripts/app.js', /import MyCrudRouter from 'apps\/my-crud\/my-crud-router'/);
      assert.fileContent('app/scripts/app.js', /new MyCrudRouter\(\{/);
    });

    describe('with existing sidebar should', function() {
      before(function(done) {
        helpers.run(path.join(__dirname, '../generators/crud'))
          .inTmpDir(function(dir) {
            var copyDone = this.async();
            var srcPath = path.join(__dirname, '../generators/app/templates/es5/app/scripts/app.js');
            var destPath = path.join(dir, '/app/scripts/app.js');
            var sidebarSrc = path.join(__dirname, '../generators/app/templates/es5/sidebar');
            var sidebarDest = path.join(dir, '/app/scripts/apps/sidebar');

            fs.copy(srcPath, destPath, function() {
              fs.copy(sidebarSrc, sidebarDest, copyDone);
            });

          })
          .withArguments(['my-crud'])
          .withOptions({ force: true })
          .withGenerators([[helpers.createDummyGenerator(), 'aowp-marionette:model']])
          .on('end', done);
      });

      it('create files', function() {
        assert.file(crudFiles);
      });

      it('registers router', function() {
        assert.fileContent('app/scripts/app.js', /'apps\/my-crud\/my-crud-router'/);
        assert.fileContent('app/scripts/app.js', /, MyCrudRouter/);
        assert.fileContent('app/scripts/app.js', /new MyCrudRouter\(\{/);
      });
    });

  });
});
