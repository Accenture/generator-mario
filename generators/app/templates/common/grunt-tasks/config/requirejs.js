module.exports = function(grunt) {
	grunt.config('requirejs', {
        dist: {
            options: {
                dir: 'dist/scripts',
                paths: {
                    'templates': '../../.tmp/scripts/templates'
                },
                mainConfigFile: 'app/scripts/main.js',
                optimize: 'uglify',
                modules: [{
                    name: 'main'
                }],
                removeCombined: true,
                findNestedDependencies: true
            }
        }
    });
}