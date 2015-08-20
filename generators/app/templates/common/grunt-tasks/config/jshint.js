module.exports = function(grunt) {
	grunt.config('jshint', {
        options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
        },
        all: [
            'Gruntfile.js',
            '<%= yeoman.app %>/scripts/*',
            '!<%= yeoman.app %>/scripts/vendor/*',
            'test/spec/{,*/}*.js'
        ]
    });
}