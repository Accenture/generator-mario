module.exports = function(grunt) {
	grunt.config('jscs', {
        src: [
            'Gruntfile.js',
            '<%= yeoman.app %>/scripts/*',
            'test/spec/{,*/}*.js'
        ],
        options: {
            config: '.jscsrc',
            verbose: true,
            reporter: require('jscs-stylish').path
        }
    });
}