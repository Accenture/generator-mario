// Karma configuration
// Generated on Wed Feb 04 2015 17:49:34 GMT+0100 (Central Europe Standard Time)
'use strict';
module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'requirejs',  'chai' , 'chai-sinon'],


        // list of files / patterns to load in the browser
        files: [
            {pattern: 'app/bower_components/jquery/dist/jquery.js', included: false},
            {pattern: 'app/bower_components/underscore/underscore.js', included: false},
            {pattern: 'app/bower_components/backbone/backbone.js', included: false},
            {pattern: 'app/bower_components/backbone.marionette/lib/backbone.marionette.js', included: false},
            {pattern: 'app/bower_components/handlebars/handlebars.runtime.js', included: false},
            {pattern: 'app/bower_components/bootstrap/dist/js/bootstrap.min.js', included: false},
            {pattern: 'app/bower_components/marked/lib/marked.js', included: false},
            'app/bower_components/modernizr/modernizr.js',
            {pattern: '.tmp/scripts/templates.js', included: false},
            {pattern: 'app/scripts/**/*.js', included: false},
            {pattern: 'test/spec/appSpec.js', included: false},
            'test/karma-test-main.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/scripts/apps/**/*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS',  'Chrome' , 'Firefox'],

        plugins: [
            //'karma-jasmine',
            'karma-requirejs',
            'karma-mocha',
            'karma-chai',
            'karma-chai-sinon',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher'
        ],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
