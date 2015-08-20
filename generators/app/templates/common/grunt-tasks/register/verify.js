module.exports = function(grunt) {
	
    grunt.registerTask('verify', [
        'jsbeautifier:verify',
        'jshint',
        'jscs'
    ]);

}
