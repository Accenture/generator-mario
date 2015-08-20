module.exports = function(grunt) {
	grunt.config('usemin', {
        html: ['<%= yeoman.dist %>/{,*/}*.html'],
        css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
        options: {
            dirs: ['<%= yeoman.dist %>']
        }
    });
}