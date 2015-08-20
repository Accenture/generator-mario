module.exports = function(grunt) {
	grunt.config('handlebars', {
        compile: {
            options: {
                namespace: 'JST',
                amd: true
            },
            files: {
                '.tmp/scripts/templates.js': ['app/scripts/**/*.hbs']
            }
        }
    });
}