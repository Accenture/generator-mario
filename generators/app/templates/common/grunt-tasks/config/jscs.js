module.exports = function(grunt) {
	grunt.config('jscs', {
        src: [
            'Gruntfile.js',
            '<%= yeoman.app %>/scripts/**/*.js',
            'test/spec/{,*/}*.js'
        ],
        options: {
            config: '<%= yeoman.app %>/.jscsrc',
            verbose: true,
            reporter: require('jscs-stylish').path
        }
    });
}
