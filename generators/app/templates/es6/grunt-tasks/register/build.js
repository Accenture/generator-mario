module.exports = function(grunt) {

    grunt.registerTask('build', [
        'templates',
        'analyze',
        'less',
        'babel:dist',
        'copy:deps',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'cssmin',
        'copy',
        'usemin'
    ]);
    
}
