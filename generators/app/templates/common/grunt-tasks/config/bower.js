module.exports = function(grunt) {
	grunt.config('bower', {
        all: {
            rjsConfig: '<%= yeoman.app %>/scripts/main.js'
        }
    });
}