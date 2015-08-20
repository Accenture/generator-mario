module.exports = function(grunt) {
	grunt.config('imagemin', {
        dist: {
            files: [{
                expand: true,
                cwd: '<%= yeoman.app %>/images',
                src: '{,*/}*.{png,jpg,jpeg}',
                dest: '<%= yeoman.dist %>/images'
            }]
        }
    });
}