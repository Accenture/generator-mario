module.exports = function(grunt) {
	grunt.config('useminPrepare', {
        html: '<%= yeoman.app %>/index.html',
        options: {
            dest: '<%= yeoman.dist %>'
        }
    });
}