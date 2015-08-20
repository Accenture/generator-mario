module.exports = function(grunt) {

	grunt.registerTask('build', [
        'clean:dist',
        'analyze',
        'createDefaultTemplate',
        'handlebars',
        'templates',
        'less',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'cssmin',
        'copy',
        'usemin'
    ]);
	
}