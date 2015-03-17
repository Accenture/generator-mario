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
                { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
              ]
            }
          },
          browser: {
            configFile: 'karma.conf.js',
            singleRun: true,
            browsers: ['PhantomJS',  'Chrome' , 'Firefox']
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
            sass: {
                options: {
                    livereload: false
                },
                files: ['<%= yeoman.app %>/styles/*.scss'],
                task: ['sass:dist']
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
                reporterOutput: 'jshintoutput.xml',
                reporter: 'checkstyle'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
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
        mocha: {
            all: {
                options: {
                    run: true,
                    reporter: 'mocha-xunit-zh',
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        requirejs: {
            dist: {
                options: {
                    dir: 'dist',
                    appDir: 'app',
                    baseUrl: 'scripts',
                    paths: {
                        'templates': '../../.tmp/scripts/templates'
                    },
                    mainConfigFile: 'app/scripts/main.js',
                    removeCombined: true,
                    findNestedDependencies: true,
                    optimize: 'uglify',
                    modules: [{
                        name: 'main'
                    }]
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
                        'styles/fonts/{,*/}*.*',
                        'bower_components/font-awesome/fonts/{,*/}*.*',
                        'jsondata/*.*',
                        'images/*.*'
                    ]
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
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
        sass: { // task
            dist: { // target
                files: { // dictionary of files
                    '<%= yeoman.app %>/styles/main.css': '<%= yeoman.app %>/styles/main.scss' // 'destination': 'source'
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
                'clean:server',
                'createDefaultTemplate',
                'handlebars',
                'connect:test',
                'open:test',
                'watch'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'createDefaultTemplate',
            'sass:dist',
            'handlebars',
            'configureProxies',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', function (isConnected) {
        isConnected = Boolean(isConnected);
        var testTasks = [
            'clean:server',
            'createDefaultTemplate',
            'handlebars',
            'connect:test',
            'mocha'
        ];

        if (!isConnected) {
            return grunt.task.run(testTasks);
        } else {
            testTasks.splice(testTasks.indexOf('connect:test'), 1);
            return grunt.task.run(testTasks);
        }
    });

    grunt.registerTask('test:browser', [
        'clean:server',
        'createDefaultTemplate',
        'handlebars',
        'connect:testInBrowser',
        'open',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'createDefaultTemplate',
        'handlebars',
        'sass',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'cssmin',
        'copy',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('clean', [
        'jsbeautifier:modify',
        'jshint'
    ]);

    grunt.registerTask('verify', [
        'jsbeautifier:verify',
        'jshint'
    ]);

    grunt.registerTask('serve:alias', [
        'serve'
    ]);
};
