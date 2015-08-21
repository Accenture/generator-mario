'use strict';

var projectFiles = function(){
    var templates = ['.editorconfig', '.jscsrc'];

    templates.forEach(function (name) {
        this.fs.copy(
            this.templatePath('common/' + name),
            this.destinationPath(name)
        );
    }, this);

    this.fs.copyTpl(
        this.templatePath('common/_.jshintrc'),
        this.destinationPath('.jshintrc'),
        {options: this.answers}
  	);
};

module.exports = projectFiles;