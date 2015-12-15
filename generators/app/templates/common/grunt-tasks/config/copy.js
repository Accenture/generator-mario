module.exports = function(grunt) {
	grunt.config('copy', {
		env: {
			files: [{ src: 'environment.json', dest: '.tmp/' }]
		},
		dist: {
			files: [{
				expand: true,
				dot: true,
				cwd: '<%= yeoman.app %>',
				dest: '<%= yeoman.dist %>',
				src: [
					'*.{ico,txt}',
					'.htaccess',
					'jsondata/*.*',
					'images/*.*',
					'bower_components/font-awesome/fonts/{,*/}*.*',
					'bower_components/modernizr/modernizr.js',
          'locales/**/*'
				]
			},
			{
				src: 'environment.json',
				dest: 'dist/'
			}],
			options: {
				noProcess: [
            '**/*.{png,gif,jpg,ico,psd,ttf,otf,woff,svg}'
        ],
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
