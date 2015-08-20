module.exports = function(grunt) {
	grunt.config('jsbeautifier', {
        modify: {
            src: ['Gruntfile.js', '<%= yeoman.app %>/scripts/{,*/}*.js'],
            options: {
                config: '.jsbeautifyrc'
            }
        },
        verify: {
            src: ['Gruntfile.js', '<%= yeoman.app %>/scripts/{,*/}*.js'],
            options: {
                mode: 'VERIFY_ONLY',
                config: '.jsbeautifyrc'
            }
        }
    });
}