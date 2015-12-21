module.exports = function(grunt) {
	grunt.config('copy', {
		dist: {
			files: [{
				expand: true,
				dot: true,
				cwd: '<%%= yeoman.app %>',
				dest: '<%%= yeoman.dist %>',
				src: [
					'*.{ico,txt}',
					'.htaccess',
					'jsondata/*.*',
					'images/*.*',
          'bower_components/font-awesome/fonts/{,*/}*.*',<% if(styles === 'less') { %>
					'bower_components/bootstrap/fonts/{,*/}*.*',<% } else { %>
					'bower_components/bootstrap-sass/assets/fonts/bootstrap/{,*/}*.*',<% } %>
					'bower_components/modernizr/modernizr.js',
          'locales/**/*'
				]
			}]
		},
		env: {
			files: [{ src: 'environment.json', dest: '.tmp/' }]
		},
		'env-prod': {
		 	files: [{
				src: 'environment.json',
				dest: 'dist/'
			}],
			options: {
				process: function(content, srcPath) {
					if(srcPath !== 'environment.json') {
						return content;
					}
					return content.replace(
						/"configuration": "dev"/g, '"configuration": "production"'
					);
				}
			}
		}
	});
}
