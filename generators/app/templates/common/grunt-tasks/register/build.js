module.exports = function(grunt) {

	grunt.registerTask('build', [
        'clean:dist',
        'analyze',
        'createDefaultTemplate',
        'handlebars',
        'templates',
        'less',
        'processhtml:dist',
        'requirejs',
        'imagemin',
        'cssmin',
        'copy',
        'usemin'
    ]);

}
