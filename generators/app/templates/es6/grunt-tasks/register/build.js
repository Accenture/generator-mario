module.exports = function(grunt) {

    grunt.registerTask('build', [
        'templates',
        'analyze',
        'less',
        'babel:dist',
        'copy:dist',
        'copy:deps',
        'processhtml:dist',
        'requirejs',
        'imagemin',
        'cssmin',
        'copy',
        'usemin'
    ]);

}
