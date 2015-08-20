module.exports = function(grunt) {
	grunt.config('open', {
        server: {
            path: 'http://localhost:<%= connect.options.port %>'
        }
    });
}