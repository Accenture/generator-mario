module.exports = function(grunt) {
	grunt.config('jsdoc', {
        dist: {
            src: ['app/scripts', 'test'],
            options: {
                destination: 'doc',
                recurse: true
            }
        }
    });
}