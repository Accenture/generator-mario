'use strict';

var buildToolPrompts = function() {
  var buildTools = {
    grunt: 'grunt',
    gulp: 'gulp',
    webpack: 'webpack (experimental)'
  };

  var done = this.async();
  this.prompt({
    type: 'list',
    name: 'buildTool',
    message: 'What build tool would you lile to use?',
    choices: [buildTools.grunt, buildTools.gulp, buildTools.webpack],
    default: buildTools.grunt
  }, function(answer) {
    switch (answer.buildTool) {
      case buildTools.grunt:
        this.useGrunt = true;
        break;
      case buildTools.gulp:
        this.useGulp = true;
        this.skipEcmaPromp = true;
        break;
      case buildTools.webpack:
        this.useWebpack = true;
        this.skipEcmaPromp = true;
        break;
    }
    done();
  }.bind(this));
};

module.exports = buildToolPrompts;
