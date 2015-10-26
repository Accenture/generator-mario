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
                    'bower_components/modernizr/modernizr.js'
                ]
            },
            {
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
        },
        deps: {
          files: [{
            expand: true,
            dot: true,
            cwd: 'app',
            dest: '.tmp',
            src: [
              'scripts/main.js',
              'bower_components/**/*.*'
            ]
          }]
        }
    });

}
