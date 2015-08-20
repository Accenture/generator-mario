module.exports = function(grunt) {
	grunt.config('rev', {
        dist: {
            files: {
                src: [
                    '<%= yeoman.dist %>/scripts/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '/styles/fonts/{,*/}*.*',
                    'jsondata/*.*'
                ]
            }
        }
    });
}