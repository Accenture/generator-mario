module.exports = function(grunt) {
	grunt.config('less', {
        dist: { // target
            files: { // dictionary of files
                '.tmp/styles/main.css': '<%= yeoman.app %>/styles/main.less' // 'destination': 'source'
            }
        }
    });
}