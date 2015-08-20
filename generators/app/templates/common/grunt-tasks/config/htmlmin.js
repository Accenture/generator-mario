module.exports = function(grunt) {
	grunt.config('htmlmin', {
        dist: {
            options: {
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            files: [{
                expand: true,
                cwd: '<%= yeoman.app %>',
                src: '*.html',
                dest: '<%= yeoman.dist %>'
            }]
        }
    });
}