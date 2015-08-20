module.exports = function(grunt) {
    
    grunt.registerTask('beautify', [
        'jsbeautifier:modify',
        'jshint',
        'jscs'
    ]);	
}
