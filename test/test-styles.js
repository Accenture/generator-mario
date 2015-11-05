'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('mario:styles', function() {

  describe('less based styles', function() {

    describe('grunt', function() {
      before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({ buildTool: 'grunt', styles: 'less' })
          .on('end', done);
      });

      it('creates files', function() {
        assert.file([
          'app/styles/main.less',
          'app/styles/default.less',
          'grunt-tasks/config/styles.js',
          'grunt-tasks/register/styles.js'
        ]);
      });

      it('contains task configuration', function() {
        assert.fileContent('grunt-tasks/config/styles.js', /grunt\.config\('less'/);

        assert.fileContent('grunt-tasks/config/styles.js', /\/styles\/main\.less/);
        assert.fileContent('grunt-tasks/config/watch.js', /\.less/);

        assert.fileContent('grunt-tasks/register/styles.js', /less/);
      });

      it('contains dependencies', function() {
        assert.fileContent('package.json', /"grunt-contrib-less":/);
        assert.fileContent('bower.json', /"bootstrap":/);
      });
    });

    describe('gulp', function() {
      before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({ buildTool: 'gulp', styles: 'less' })
          .on('end', done);
      });

      it('creates files', function() {
        assert.file([
          'app/styles/main.less',
          'app/styles/default.less'
        ]);
      });

      it('contains task configuration', function() {
        assert.fileContent('Gulpfile.js', /gulp\.src\('app\/styles\/main.less'/);
        assert.fileContent('Gulpfile.js', /plugins\.less/);
      });

      it('contains dependencies', function() {
        assert.fileContent('package.json', /"gulp-less":/);
        assert.fileContent('bower.json', /"bootstrap":/);
      });
    });

    describe('webpack', function() {
      before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({ buildTool: 'webpack', styles: 'less' })
          .on('end', done);
      });

      it('creates files', function() {
        assert.file([
          'app/styles/main.less',
          'app/styles/default.less'
        ]);
      });

      it('contains task configuration', function() {
        assert.fileContent('webpack.config.js', /!less-loader/);
        assert.fileContent('webpack.config.js', /'bootstrap': 'bootstrap\/dist\/js\/bootstrap\.js'/);
      });

      it('contains dependencies', function() {
        assert.fileContent('package.json', /"less-loader":/);
        assert.fileContent('bower.json', /"bootstrap":/);
      });
    });

  });

  describe('sass based styles', function() {

    describe('grunt', function() {
      before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({ buildTool: 'grunt', styles: 'sass' })
          .on('end', done);
      });

      it('creates files', function() {
        assert.file([
          'app/styles/main.scss',
          'app/styles/default.scss',
          'grunt-tasks/config/styles.js',
          'grunt-tasks/register/styles.js'
        ]);
      });

      it('contains task configuration', function() {
        assert.fileContent('grunt-tasks/config/styles.js', /grunt\.config\('sass'/);

        assert.fileContent('grunt-tasks/config/styles.js', /\/styles\/main\.scss/);
        assert.fileContent('grunt-tasks/config/watch.js', /\.scss/);

        assert.fileContent('grunt-tasks/register/styles.js', /sass/);
      });

      it('contains dependencies', function() {
        assert.fileContent('package.json', /"grunt-sass":/);
        assert.fileContent('bower.json', /"bootstrap-sass":/);
      });
    });

    describe('gulp', function() {
      before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({ buildTool: 'gulp', styles: 'sass' })
          .on('end', done);
      });

      it('creates files', function() {
        assert.file([
          'app/styles/main.scss',
          'app/styles/default.scss'
        ]);
      });

      it('contains task configuration', function() {
        assert.fileContent('Gulpfile.js', /gulp\.src\('app\/styles\/main.scss'/);
        assert.fileContent('Gulpfile.js', /plugins\.sass/);
      });

      it('contains dependencies', function() {
        assert.fileContent('package.json', /"gulp-sass":/);
        assert.fileContent('bower.json', /"bootstrap-sass":/);
      });
    });

    describe('webpack', function() {
      before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({ buildTool: 'webpack', styles: 'sass' })
          .on('end', done);
      });

      it('creates files', function() {
        assert.file([
          'app/styles/main.scss',
          'app/styles/default.scss'
        ]);
      });

      it('contains task configuration', function() {
        assert.fileContent('webpack.config.js', /!sass-loader/);
        assert.fileContent('webpack.config.js', /'bootstrap': 'bootstrap-sass\/assets\/javascripts\/bootstrap\.js'/);
      });

      it('contains dependencies', function() {
        assert.fileContent('package.json', /"sass-loader":/);
        assert.fileContent('bower.json', /"bootstrap-sass":/);
      });
    });
  });

});
