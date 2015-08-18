'use strict';

var projectFiles = function(){
    var templates = ['.editorconfig', '.jshintrc'];

    templates.forEach(function (name) {
        this.fs.copy(
            this.templatePath('common/' + name),
            this.destinationPath(name)
        );
    }, this);

};

module.exports = projectFiles;