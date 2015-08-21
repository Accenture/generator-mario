'use strict';

var appFiles = function(){
    var templates = ['.jsbeautifyrc', '.bowerrc',
        'app/images', 'app/jsondata', 'app/styles', 'app/.htaccess', 'app/404.html', 'app/favicon.ico',
        'app/index.html','app/.htaccess', 'app/robots.txt', 'app/scripts/main.js', 'grunt-tasks', 'Gruntfile.js'];

    templates.forEach(function (name) {
        this.fs.copy(
            this.templatePath('common/' + name),
            this.destinationPath(name)
        );
    }, this);

    this.fs.copyTpl(
        this.templatePath('common/_bower.json'),
        this.destinationPath('bower.json'),
        {appName: this.projectName}
    );

    this.fs.copyTpl(
        this.templatePath('common/_package.json'),
        this.destinationPath('package.json'),
        {
            appName: this.projectName,
            options: this.answers
        }
    );

    var prefix = (this.ecma === 'es6') ? 'es6/' : 'es5/';
    var esmaSpecificTemplates = ['app/scripts'];

    esmaSpecificTemplates.forEach(function (name) {
        // skip gruntfile for gulp configuration
        if(this.useGulp && name === 'Gruntfile.js') {
          return;   
        }

        this.fs.copy(
          this.templatePath(prefix + name),
          this.destinationPath(name)
        );

    }, this);

    if(this.ecma === 'es6') {
        this.fs.copy(
          this.templatePath('es6/grunt-tasks'),
          this.destinationPath('grunt-tasks')
        );
    }

    if(this.useWebpack) {
        this.fs.copy(
            this.templatePath('webpack'),
            this.destinationPath()
        );

        this.fs.copyTpl(
            this.templatePath('webpack/package.json'),
            this.destinationPath('package.json'),
            {appName: this.projectName}
        );
    }

    if(this.useGulp) {
        this.fs.copy(
            this.templatePath('gulp'),
            this.destinationPath()
        );

        this.fs.copyTpl(
            this.templatePath('gulp/package.json'),
            this.destinationPath('package.json'),
            {appName: this.projectName}
        );
    }

    if (this.phabricatorDeps) {
        this.fs.copy(
            this.templatePath('common/.arclint'),
            this.destinationPath('.arclint')
        );
        this.fs.copyTpl(
            this.templatePath('common/_.arcconfig'),
            this.destinationPath('.arcconfig'),
            {ip: this.phabricatorIP, appName: this.projectName}
        );
    }

    this.fs.copyTpl(
        this.templatePath('common/_karma.conf.js'),
        this.destinationPath('karma.conf.js'),
        {options: this.answers}
    );
    this.fs.copy(
        this.templatePath('common/test/karma-test-main.js'),
        this.destinationPath('test/karma-test-main.js')
    );

    // rename-copy gitignore manually
    // (.gitignore files get removed upon `npm install`)
    this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
    );
};

module.exports = appFiles;