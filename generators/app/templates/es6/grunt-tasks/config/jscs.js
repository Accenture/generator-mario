module.exports = function(grunt) {
	grunt.config('jscs', {
        src: [
	            'Gruntfile.js',
	            '<%= yeoman.app %>/scripts/*',
	            'test/spec/{,*/}*.js'
            ],
            options: {
	            config: '.jscsrc',
	            esnext: true,
	            verbose: true,
	            reporter: require('jscs-stylish').path
            }
    });
}
