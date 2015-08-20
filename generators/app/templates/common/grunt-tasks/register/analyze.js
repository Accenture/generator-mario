module.exports = function(grunt) {
	
    grunt.registerTask('analyze', [
        'jshint',
        'jscs'
    ]);
	
}