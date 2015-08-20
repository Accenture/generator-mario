module.exports = function(grunt) {
    grunt.config('karma', {
        unit: {
            configFile: 'karma.conf.js',
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
    });
}