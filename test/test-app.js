'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('mario:app', function() {
  describe('default', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt({
          projectName: 'demo-application'
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'bower.json',
        'package.json',
        '.editorconfig',
        '.jshintrc'
      ]);
    });
    it('sets name', function() {
      assert.fileContent('package.json', /"name": "demo-application"/);
    });
  });

  describe('with arcanist file default URL', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt({
          phabricatorDeps: true
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'bower.json',
        'package.json',
        '.editorconfig',
        '.jshintrc',
        '.arcconfig',
        '.arclint'
      ]);
    });
    it('sets phabricator uri', function() {
      assert.fileContent('.arcconfig', /"conduit_uri": "http:\/\/127\.0\.0\.1"/);
    });
  });

  describe('with arcanist and specified URL', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt({
          phabricatorDeps: true,
          phabricatorIP: 'http://phabricator.mydomain.com'
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'bower.json',
        'package.json',
        '.editorconfig',
        '.jshintrc',
        '.arcconfig',
        '.arclint'
      ]);
    });
    it('sets default phabricator uri', function() {
      assert.fileContent('.arcconfig', /"conduit_uri": "http:\/\/phabricator.mydomain.com"/);
    });
  });

  describe('with tests in separate directory - default option', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt({
          tests: 'custom',
          testFolder: 'test/'
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'bower.json',
        'package.json',
        '.editorconfig',
        '.jshintrc',
        'test/apps',
        'karma.conf.js',
        'test/karma-test-main.js'
      ]);
    });
    it('karma.conf.js with configuration for separate dirs', function() {
      assert.fileContent('karma.conf.js', /pattern: 'test\/apps/);
    });
    it('karma-test-main.js for source in separate directory', function() {
      assert.fileContent('test/karma-test-main.js', /var SRC_REGEXP = \/\(test\\\/\)apps\\\/\.\+\\\.js/);
    });
  });

  describe('with tests in separate directory - custom option', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt({
          tests: 'custom',
          testFolder: 'cool/spec/'
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'bower.json',
        'package.json',
        '.editorconfig',
        '.jshintrc',
        'karma.conf.js',
        'cool/spec/apps',
        'test/karma-test-main.js'
      ]);
    });
    it('karma.conf.js with configuration for separate dirs', function() {
      assert.fileContent('karma.conf.js', /pattern: 'cool\/spec\/apps/);
    });
    it('karma-test-main.js for source in separate directory', function() {
      assert.fileContent('test/karma-test-main.js', /var SRC_REGEXP = \/\(cool\\\/spec\\\/\)apps\\\/\.\+\\\.js/);
    });
  });

  describe('with tests in app directory', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt({
          tests: 'appcode'
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'bower.json',
        'package.json',
        '.editorconfig',
        '.jshintrc',
        'karma.conf.js',
        'test/karma-test-main.js'
      ]);
    });
    it('karma-test-main.js for source in appcode directory', function() {
      assert.fileContent('test/karma-test-main.js', /var SRC_REGEXP = \/app/);
    });
  });

  describe('grunt setup ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt({
          buildTool: 'grunt',
          ecma: 6
        })
        .on('end', done);
    });

    it('should copy grunt files', function() {
      assert.file(['Gruntfile.js', 'grunt-tasks']);
      assert.noFile(['Gulpfile.js', 'webpack.config.js']);
    });

    it('should copy package.json with grunt packages', function() {
      assert.file(['package.json']);
      assert.fileContent('package.json', /.grunt-/);
    });

    it('should have babel package in package.json', function() {
      assert.file(['package.json']);
      assert.fileContent('package.json', /grunt-babel/);
    });

    it('should have babelPreprocessor in karma.conf.js', function() {
      assert.file(['karma.conf.js']);
      assert.fileContent('karma.conf.js', /babelPreprocessor: {/);
    });

    it('should have esnext option in .jshintrc', function() {
      assert.file(['.jshintrc']);
      assert.fileContent('.jshintrc', /"esnext": true/);
    });
  });

  describe('gulp setup ES5', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt({
          buildTool: 'gulp',
          ecma: 5
        })
        .on('end', done);
    });

    it('should copy gulp file', function() {
      assert.file(['Gulpfile.js']);
      assert.noFile(['Gruntfile.js', 'grunt-tasks', 'webpack.config.js']);
      assert.noFileContent('Gulpfile.js', /.task\('babel'/);
      assert.noFileContent('Gulpfile.js', /.task\('copy-bower'/);
      assert.noFileContent('Gulpfile.js', /.task\('copy-main'/);
      assert.noFileContent('Gulpfile.js', /'templates', 'babel', 'copy-main', 'copy-bower'/);
      assert.noFileContent('Gulpfile.js', /gulp.watch\('app\/scripts\/\*\*\/\*.js', \['babel'\]\)/);
      assert.noFileContent('Gulpfile.js', /baseUrl: '.tmp\/scripts'/);
      assert.noFileContent('Gulpfile.js', /mainConfigFile: '.tmp\/scripts\/main.js'/);
    });

    it('should copy package.json with gulp packages', function() {
      assert.file(['package.json']);
      assert.fileContent('package.json', /.gulp-/);
      assert.noFileContent('package.json', /.gulp-babel/);
    });

    it('should copy jscsrc', function() {
      assert.file(['.jscsrc']);
      assert.noFileContent('.jscsrc', /"esnext": true,/);
    });

    it('should copy jshintrc', function() {
      assert.file(['.jshintrc']);
      assert.noFileContent('.jshintrc', /"esnext": true,/);
    });
  });

  describe('Gulp setup ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt({
          buildTool: 'gulp',
          ecma: 6
        })
        .on('end', done);
    });

    it('should copy gulp file', function() {
      assert.file(['Gulpfile.js']);
      assert.noFile(['Gruntfile.js', 'grunt-tasks', 'webpack.config.js']);
      assert.fileContent('Gulpfile.js', /.task\('babel'/);
      assert.fileContent('Gulpfile.js', /.task\('copy-bower'/);
      assert.fileContent('Gulpfile.js', /.task\('copy-main'/);
      assert.fileContent('Gulpfile.js', /'templates', 'babel', 'copy-main', 'copy-bower'/);
      assert.fileContent('Gulpfile.js', /gulp.watch\('app\/scripts\/\*\*\/\*.js', \['babel'\]\)/);
      assert.fileContent('Gulpfile.js', /baseUrl: '.tmp\/scripts'/);
      assert.fileContent('Gulpfile.js', /mainConfigFile: '.tmp\/scripts\/main.js'/);
    });

    it('should copy package.json with gulp packages', function() {
      assert.file(['package.json']);
      assert.fileContent('package.json', /.gulp-/);
      assert.fileContent('package.json', /.gulp-babel/);
    });

    it('should copy jscsrc', function() {
      assert.file(['.jscsrc']);
      assert.fileContent('.jscsrc', /"esnext": true,/);
    });

    it('should copy jshintrc', function() {
      assert.file(['.jshintrc']);
      assert.fileContent('.jshintrc', /"esnext": true,/);
    });
  });

  describe('webpack setup ES5', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt({
          buildTool: 'webpack',
          ecma: 5
        })
        .on('end', done);
    });

    it('should copy webpack files', function() {
      assert.file(['Gruntfile.js', 'webpack.config.js']);
      assert.noFile(['Gulpfile.js', 'grunt-tasks']);
    });

    it('should copy package.json with grunt packages', function() {
      assert.file(['package.json']);
      assert.fileContent('package.json', /.grunt-/);
    });

    it('should copy package.json with webpack packages', function() {
      assert.file(['package.json']);
      assert.fileContent('package.json', /.webpack-/);
    });

    it('should have webpack configuration in karma.conf.js', function() {
      assert.file(['karma.conf.js']);
      assert.fileContent('karma.conf.js', /webpack: {/);
    });
  });

  describe('webpack setup ES6', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt({
          buildTool: 'webpack',
          ecma: 6
        })
        .on('end', done);
    });

    it('should copy webpack files', function() {
      assert.file(['Gruntfile.js', 'webpack.config.js']);
      assert.noFile(['Gulpfile.js', 'grunt-tasks']);
    });

    it('should copy main.js contains ES6 imports and initialization', function() {
      assert.file(['app/scripts/main.js']);
      assert.fileContent('app/scripts/main.js', /import App from '.\/app'/);
      assert.fileContent('app/scripts/main.js', /import 'bootstrap'/);
      assert.fileContent('app/scripts/main.js', /import '..\/styles\/main.less'/);
      assert.fileContent('app/scripts/main.js', /App.start()/);
    });

    it('should copy package.json with grunt packages', function() {
      assert.file(['package.json']);
      assert.fileContent('package.json', /.grunt-/);
    });

    it('should copy package.json with webpack packages', function() {
      assert.file(['package.json']);
      assert.fileContent('package.json', /.webpack-/);
    });

    it('should have babel package in package.json', function() {
      assert.file(['package.json']);
      assert.fileContent('package.json', /grunt-babel/);
    });

    it('should have esnext option in Gruntfile.js', function() {
      assert.file(['Gruntfile.js']);
      assert.fileContent('Gruntfile.js', /esnext: true/);
    });

    it('should have esnext option in .jshintrc', function() {
      assert.file(['.jshintrc']);
      assert.fileContent('.jshintrc', /"esnext": true/);
    });

    it('should have webpack configuration in karma.conf.js', function() {
      assert.file(['karma.conf.js']);
      assert.fileContent('karma.conf.js', /webpack: {/);
    });

    it('should have necessary preprocessors in karma.conf.js', function() {
      assert.file(['karma.conf.js']);
      assert.fileContent('karma.conf.js', /\['babel', 'webpack', 'coverage'/);
    });
  });
});
