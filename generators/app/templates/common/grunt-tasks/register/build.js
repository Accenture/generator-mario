module.exports = function(grunt) {

	grunt.registerTask('build', [
        'clean:dist',
        'analyze',
        'createDefaultTemplate',
        'handlebars',
        'templates',
        'styles',
        'processhtml:dist',
        'requirejs',
        'imagemin',
        'cssmin',
        'copy:dist',
        'copy:env-prod',
        'usemin'
    ]);

}
