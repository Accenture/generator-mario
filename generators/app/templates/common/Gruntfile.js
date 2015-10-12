'use strict';

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        configureProxies: 'grunt-connect-proxy'
    });

    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({yeoman: yeomanConfig});

    //load all custom task configs
    grunt.loadTasks('grunt-tasks/config');
    grunt.loadTasks('grunt-tasks/register');

    grunt.registerTask('default', [
        'jshint',
        'jscs',
        'test',
        'build'
    ]);

};
