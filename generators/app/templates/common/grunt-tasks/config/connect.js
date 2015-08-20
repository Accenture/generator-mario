module.exports = function(grunt) {

    var SERVER_PORT = 9001;
    var LIVERELOAD_PORT = 35729;

    var lrSnippet = require('connect-livereload')({
        port: LIVERELOAD_PORT
    });
    
    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };
    
    grunt.config('connect', {
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
    });
}