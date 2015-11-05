'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs-extra');

describe('mario:crud', function() {
  var crudFiles = [
    'app/scripts/apps/my_crud/my_crud_router.js',
    'app/scripts/apps/my_crud/my_crud_controller.js',
    'app/scripts/apps/my_crud/my_crud_collection.js',

    'app/scripts/apps/my_crud/my_crud_item_view.js',
    'app/scripts/apps/my_crud/my_crud_item_view_template.hbs',

    'app/scripts/apps/my_crud/my_crud_composite_view.js',
    'app/scripts/apps/my_crud/my_crud_composite_view_template.hbs',

    'app/scripts/apps/my_crud/my_crud_detail_item_view.js',
    'app/scripts/apps/my_crud/my_crud_detail_item_view_template.hbs',

    'app/scripts/apps/my_crud/my_crud_create_item_view.js',
    'app/scripts/apps/my_crud/my_crud_create_item_view_template.hbs',

    'app/scripts/apps/sidebar'
  ];

  describe('ES5 version with Mocha test framework should', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/crud'))
        .inTmpDir(function(dir) {
          var copyDone = this.async();
          var srcPath = path.join(__dirname, '../generators/app/templates/es5/app/scripts/app.js');
          var destPath = path.join(dir, '/app/scripts/app.js');

          fs.copy(srcPath, destPath, copyDone);
        })
        .withArguments(['my_crud'])
        .withOptions({
          force: true
        })
        .withLocalConfig({ preferences: {testFramework: 'mocha'} })
        .withGenerators([path.join(__dirname, '../generators/model')])
        .on('end', done);
    });

    it('create files', function() {
      assert.file(crudFiles);
    });

    it('have Mocha spies', function() {
      assert.fileContent('app/scripts/apps/my_crud/my_crud_composite_view_test.js', /sinon.spy\(\)/);
      assert.fileContent('app/scripts/apps/my_crud/my_crud_composite_view_test.js', /this.eventSpy.callCount/);
      assert.fileContent('app/scripts/apps/my_crud/my_crud_controller_test.js', /sinon.spy/);
    });

    it('registers router', function() {
      assert.fileContent('app/scripts/app.js', /'apps\/my_crud\/my_crud_router'/);
      assert.fileContent('app/scripts/app.js', /, MyCrudRouter/);
      assert.fileContent('app/scripts/app.js', /new MyCrudRouter\(\{/);

      assert.noFileContent('app/scripts/app.js', /import/);
    });

    it('register sidebar', function() {
      assert.fileContent('app/scripts/app.js', /'apps\/sidebar\/sidebar_controller'/);
      assert.fileContent('app/scripts/app.js', /, SidebarController/);
      assert.fileContent('app/scripts/app.js', /new SidebarController\(\{/);
    });

    describe('with existing sidebar should', function() {
      before(function(done) {
        helpers.run(path.join(__dirname, '../generators/crud'))
          .inTmpDir(function(dir) {
            var copyDone = this.async();
            var srcPath = path.join(__dirname, '../generators/app/templates/es5/app/scripts/app.js');
            var destPath = path.join(dir, '/app/scripts/app.js');
            var sidebarSrc = path.join(__dirname, '../generators/crud/templates/es5/sidebar');
            var sidebarDest = path.join(dir, '/app/scripts/apps/sidebar');

            fs.copy(srcPath, destPath, function() {
              fs.copy(sidebarSrc, sidebarDest, copyDone);
            });

          })
          .withArguments(['my_crud'])
          .withOptions({ force: true })
          .withGenerators([path.join(__dirname, '../generators/model')])
          .on('end', done);
      });

      it('create files', function() {
        assert.file(crudFiles);
      });

      it('registers router', function() {
        assert.fileContent('app/scripts/app.js', /'apps\/my_crud\/my_crud_router'/);
        assert.fileContent('app/scripts/app.js', /, MyCrudRouter/);
        assert.fileContent('app/scripts/app.js', /new MyCrudRouter\(\{/);
      });
    });
  });

  describe('ES6 version with Jasmine test framework should', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/crud'))
        .inTmpDir(function(dir) {
          var copyDone = this.async();
          var srcPath = path.join(__dirname, '../generators/app/templates/es6/app/scripts/app.js');
          var destPath = path.join(dir, '/app/scripts/app.js');

          fs.copy(srcPath, destPath, copyDone);
        })
        .withArguments(['my_crud'])
        .withOptions({ force: true })
        .withLocalConfig({preferences: {ecma: 6, testFramework: 'jasmine'}})
        .withGenerators([path.join(__dirname, '../generators/model')])
        .on('end', done);
    });

    it('create files', function() {
      assert.file(crudFiles);
    });

    it('have Jasmine spies', function() {
      assert.fileContent('app/scripts/apps/my_crud/my_crud_composite_view_test.js', /jasmine.createSpy/);
      assert.fileContent('app/scripts/apps/my_crud/my_crud_composite_view_test.js', /this.eventSpy.calls.count\(\)/);
      assert.fileContent('app/scripts/apps/my_crud/my_crud_controller_test.js', /spyOn/);
    });

    it('registers router', function() {
      assert.fileContent('app/scripts/app.js', /import/);

      assert.fileContent('app/scripts/app.js', /import MyCrudRouter from 'apps\/my_crud\/my_crud_router'/);
      assert.fileContent('app/scripts/app.js', /new MyCrudRouter\(\{/);
    });

    it('register sidebar', function() {
      assert.fileContent('app/scripts/app.js', /import SidebarController from 'apps\/sidebar\/sidebar_controller'/);
      assert.fileContent('app/scripts/app.js', /new SidebarController\(\{/);
    });

    describe('with existing sidebar should', function() {
      before(function(done) {
        helpers.run(path.join(__dirname, '../generators/crud'))
          .inTmpDir(function(dir) {
            var copyDone = this.async();
            var srcPath = path.join(__dirname, '../generators/app/templates/es5/app/scripts/app.js');
            var destPath = path.join(dir, '/app/scripts/app.js');
            var sidebarSrc = path.join(__dirname, '../generators/crud/templates/es6/sidebar');
            var sidebarDest = path.join(dir, '/app/scripts/apps/sidebar');

            fs.copy(srcPath, destPath, function() {
              fs.copy(sidebarSrc, sidebarDest, copyDone);
            });

          })
          .withArguments(['my_crud'])
          .withOptions({ force: true })
          .withGenerators([path.join(__dirname, '../generators/model')])
          .on('end', done);
      });

      it('create files', function() {
        assert.file(crudFiles);
      });

      it('registers router', function() {
        assert.fileContent('app/scripts/app.js', /'apps\/my_crud\/my_crud_router'/);
        assert.fileContent('app/scripts/app.js', /, MyCrudRouter/);
        assert.fileContent('app/scripts/app.js', /new MyCrudRouter\(\{/);
      });
    });

  });
});
