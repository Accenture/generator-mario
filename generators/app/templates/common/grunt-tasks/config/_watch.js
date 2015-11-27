module.exports = function(grunt) {

    var LIVERELOAD_PORT = 35729;

	grunt.config('watch', {
        options: {
            nospawn: true,
            livereload: true
        },
        <%= styles %>: {
            files: ['<%%= yeoman.app %>/styles/*.<% if(styles === 'less') { %>less<% } else { %>scss<% } %>'],
            task: ['styles']
        },
        livereload: {
            options: {
                livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
            },
            files: [
                '<%%= yeoman.app %>/*.html',
                '{.tmp,<%%= yeoman.app %>}/styles/{,*/}*.css',
                '{.tmp,<%%= yeoman.app %>}/scripts/**/*.{js,hbs}',
                '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                'test/spec/**/*.js'
            ]
        },
        handlebars: {
            files: ['<%%= yeoman.app %>/scripts/**/*.hbs'],
            tasks: ['handlebars']
        }
    });
}
