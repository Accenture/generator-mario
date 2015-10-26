module.exports = function(grunt) {

    grunt.registerTask('styles', [<% if(styles === 'less') { %>
      'less'<% } else { %>'sass'<% } %>
    ]);
}
