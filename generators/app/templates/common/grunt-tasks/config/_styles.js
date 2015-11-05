module.exports = function(grunt) {
	grunt.config('<%= styles %>', {
    dist: { // target
      files: { // dictionary of files
        '.tmp/styles/main.css': '<%%= yeoman.app %>/styles/main.<% if(styles === 'less') { %>less<% } else { %>scss<% } %>' // 'destination': 'source'
      }
    }
  });
}
