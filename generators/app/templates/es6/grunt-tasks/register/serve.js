module.exports = function(grunt) {

	grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve' + (target ? ':' + target : '')]);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'configureProxies:dist', 'connect:dist:keepalive']);
        }

        if (target === 'test') {
            return grunt.task.run([
                'templates',
                'connect:test',
                'open:test',
                'watch'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'analyze',
            'createDefaultTemplate',
            'handlebars',
            'templates',
            'styles',
						'copy:env',
            'babel:dist',
            'configureProxies',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('serve:alias', [
        'serve'
    ]);

}
