module.exports = function(grunt) {
	
	grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('templates', [
        'clean:dist',
        'createDefaultTemplate',
        'handlebars'
    ]);
    
}