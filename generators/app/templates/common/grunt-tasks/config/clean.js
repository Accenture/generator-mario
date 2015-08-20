module.exports = function(grunt) {
	grunt.config('clean', {
        dist: ['.tmp', '<%= yeoman.dist %>/*'],
        server: '.tmp'
    });
}