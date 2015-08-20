module.exports = function(grunt) {
	grunt.config('cssmin', {
        dist: {
            files: {
                '<%= yeoman.dist %>/styles/main.css': [
                    '.tmp/styles/{,*/}*.css'
                ]
            }
        }
    });
}