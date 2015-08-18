'use strict';

var appFiles = function(){
    var templates = ['.jsbeautifyrc', '.bowerrc',
        'app/images', 'app/jsondata', 'app/styles', 'app/.htaccess', 'app/404.html', 'app/favicon.ico',
        'app/index.html','app/.htaccess', 'app/robots.txt', 'app/scripts/main.js'];

    templates.forEach(function (name) {
        this.fs.copy(
            this.templatePath('common/' + name),
            this.destinationPath(name)
        );
    }, this);

    this.fs.copyTpl(
        this.templatePath('common/bower.json'),
        this.destinationPath('bower.json'),
        {appName: this.projectName}
    );

    this.fs.copyTpl(
        this.templatePath('common/package.json'),
        this.destinationPath('package.json'),
        {
            appName: this.projectName,
            options: this.answers
        }
    );

    if(this.useWebpack) {
        this.fs.copy(
            this.templatePath('webpack'),
            this.destinationPath(),
            {appName: this.projectName}
        );

        this.fs.copyTpl(
            this.templatePath('webpack/package.json'),
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
            this.templatePath('common/.arcconfig'),
            this.destinationPath('.arcconfig'),
            {ip: this.phabricatorIP, appName: this.projectName}
        );
    }

    this.fs.copyTpl(
        this.templatePath('common/karma.conf.js'),
        this.destinationPath('karma.conf.js'),
        {options: this.answers}
    );
    this.fs.copyTpl(
        this.templatePath('common/test/karma-test-main.js'),
        this.destinationPath('test/karma-test-main.js'),
        {options: this.answers}
    );

    // rename-copy gitignore manually
    // (.gitignore files get removed upon `npm install`)
    this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
    );
};

module.exports = appFiles;