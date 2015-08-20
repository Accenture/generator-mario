'use strict';

module.exports = function(grunt) {
	
	grunt.config('babel', {
      options: {
        sourceMap: true,
        modules: 'amd'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/scripts',
          src: ['**/*.js', '!main.js'],
          dest: '.tmp/scripts',
          ext:'.js'
        }]
      }
	});

}
