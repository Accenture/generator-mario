module.exports = function(grunt) {
	grunt.config('processhtml', {
        dist: {
            src: './app/index.html',
            dest: './dist/index.html'
        }
    });
}
