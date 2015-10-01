module.exports = function(grunt) {
	grunt.config('copy', {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>',
                dest: '<%= yeoman.dist %>',
                src: [
                    '*.{ico,txt}',
                    '.htaccess',
                    'jsondata/*.*',
                    'images/*.*',
                    'bower_components/font-awesome/fonts/{,*/}*.*',
                    'bower_components/modernizr/modernizr.js'
                ]
            }]
        }
    });
}
