'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9001;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    //load grunt-connect-proxy
    grunt.loadNpmTasks('grunt-connect-proxy');

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        karma: {
            unit: {
                configFIle: 'karma.conf.js',
                singleRun: true
            },
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS'],
                coverageReporter: {
                    // specify a common output directory
                    dir: 'coverage',
                    reporters: [
                        // reporters not supporting the `file` property
                        { type: 'html', subdir: 'report-html' },
                        // reporters supporting the `file` property, use `subdir` to directly
                        // output them in the `dir` directory
                        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
                        { type: 'text', subdir: '.', file: 'text.txt' },
                        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
                    ]
                }
            },
            browser: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS', 'Chrome', 'Firefox']
            }
        },
        jsdoc: {
            dist: {
                src: ['app/scripts', 'test'],
                options: {
                    destination: 'doc',
                    recurse: true
                }
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST',
                    amd: true
                },
                files: {
                    '.tmp/scripts/templates.js': ['app/scripts/**/*.hbs']
                }
            }
        },
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            less: {
                options: {
                    livereload: false
                },
                files: ['<%= yeoman.app %>/styles/*.less'],
                task: ['less:dist']
            },
            livereload: {
                options: {
                    livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/**/*.{js,hbs}',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    'test/spec/**/*.js'
                ]
            },
            handlebars: {
                files: ['<%= yeoman.app %>/scripts/**/*.hbs'],
                tasks: ['handlebars']
            }
        },
        connect: {
            options: {
                port: grunt.option('port') || SERVER_PORT,
                hostname: '0.0.0.0'
            },
            proxies: [{
                context: ['/api'],
                host: 'localhost',
                port: 8081
            }, {
                context: ['/socket.io'],
                host: 'localhost',
                port: 8081,
                ws: true
            }],
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            testInBrowser: {
                options: {
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/*',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        jscs: {
            src: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/*',
                'test/spec/{,*/}*.js'
            ],
            options: {
                config: '.jscsrc',
                verbose: true,
                reporter: require('jscs-stylish').path
            }
        },
        jsbeautifier: {
            modify: {
                src: ['Gruntfile.js', '<%= yeoman.app %>/scripts/{,*/}*.js'],
                options: {
                    config: '.jsbeautifyrc'
                }
            },
            verify: {
                src: ['Gruntfile.js', '<%= yeoman.app %>/scripts/{,*/}*.js'],
                options: {
                    mode: 'VERIFY_ONLY',
                    config: '.jsbeautifyrc'
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/bower_components/foundation/css/foundation.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
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
                        'bower_components/modernizr/modernizr.js',
                        'bower_components/requirejs/*.js',
                        'index.html'
                    ]
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        },
        requirejs: {
            dist: {
                options: {
                    dir: 'dist/scripts',
                    paths: {
                        'templates': '../../.tmp/scripts/templates'
                    },
                    mainConfigFile: 'app/scripts/main.js',
                    optimize: 'uglify',
                    modules: [{
                        name: 'main'
                    }],
                    removeCombined: true,
                    findNestedDependencies: true
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '/styles/fonts/{,*/}*.*',
                        'jsondata/*.*'
                    ]
                }
            }
        },
        less: { // task
            dist: { // target
                files: { // dictionary of files
                    '<%= yeoman.app %>/styles/main.css': '<%= yeoman.app %>/styles/main.less' // 'destination': 'source'
                }
            }
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve' + (target ? ':' + target : '')]);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'configureProxies:dist', 'connect:dist:keepalive']);
        }

        if (target === 'test') {
            return grunt.task.run([
                'templates',
                'connect:test',
                'open:test',
                'watch'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'analyze',
            'createDefaultTemplate',
            'handlebars',
            'templates',
            'less:dist',
            'configureProxies',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', ['test:karma']);

    grunt.registerTask('test:browser', [
        'templates',
        'karma:browser'
    ]);

    grunt.registerTask('templates', [
        'clean:dist',
        'createDefaultTemplate',
        'handlebars'
    ]);

    grunt.registerTask('test:karma', [
        'templates',
        'karma:continuous'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
<<<<<<< HEAD
        'analyze',
        'createDefaultTemplate',
        'handlebars',
=======
>>>>>>> master
        'templates',
        'less',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'cssmin',
        'copy',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'jscs',
        'test',
        'build'
    ]);

<<<<<<< HEAD
=======
    grunt.registerTask('beautify', [
        'jsbeautifier:modify',
        'jshint',
        'jscs'
    ]);

>>>>>>> master
    grunt.registerTask('verify', [
        'jsbeautifier:verify',
        'jshint',
        'jscs'
    ]);

    grunt.registerTask('serve:alias', [
        'serve'
    ]);

    grunt.registerTask('analyze', [
        'jshint',
        'jscs'
    ]);

};
