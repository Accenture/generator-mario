'use strict';

module.exports = function(Generator) {

  Generator.prototype.projectFiles = function() {
    var templates = ['.editorconfig', '.jscsrc'];

    templates.forEach(function(name) {
      this.fs.copy(
        this.templatePath('common/' + name),
        this.destinationPath(name)
      );
    }, this);

    this.fs.copyTpl(
      this.templatePath('common/_.jshintrc'),
      this.destinationPath('.jshintrc'),
      this.preferences
    );

    // rename-copy gitignore manually
    // (.gitignore files get removed upon `npm install`)
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    if (this.preferences.phabricatorDeps) {
      this.fs.copy(
        this.templatePath('common/.arclint'),
        this.destinationPath('.arclint')
      );
      this.fs.copyTpl(
        this.templatePath('common/_.arcconfig'),
        this.destinationPath('.arcconfig'),
        this.preferences
      );
    }
  };

};
