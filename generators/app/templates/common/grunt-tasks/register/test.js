module.exports = function(grunt) {

	grunt.registerTask('test', ['test:karma']);

    grunt.registerTask('test:browser', [
        'templates',
        'karma:browser'
    ]);

    grunt.registerTask('test:karma', [
        'templates',
        'karma:continuous'
    ]);

}
