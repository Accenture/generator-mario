module.exports = function(grunt) {
	  grunt.config('requirejs', {
        dist: {
            options: {
                dir: 'dist/scripts',
                paths: {
                    'templates': '../../.tmp/scripts/templates'
                },
                mainConfigFile: '.tmp/scripts/main.js',
                optimize: 'uglify',
                modules: [{
                    name: 'vendor',
                    create: true,
                    include: ['../../app/bower_components/requirejs/require', 'jquery', 'backbone', 'underscore', 'bootstrap', 'handlebars', 'marionette', 'radio', 'fastclick']
                    },
                    {
                    name: 'main',
                    exclude: ['vendor'],
                    include: ['../../app/bower_components/requirejs/require']
                    }
                ],
                removeCombined: true,
                findNestedDependencies: true,
                preserveLicenseComments: false
            }
        }
    });
}
