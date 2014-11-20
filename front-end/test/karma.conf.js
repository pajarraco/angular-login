/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function (config) {
    config.set({
        basePath: '../',
        files: [
            'app/lib/angular/angular.js',
            'app/lib/angular-mocks/angular-mocks.js',
            'app/js/**/*.js',
            'test/test/**/*.js'
        ],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-html-reporter'
        ],
        exclude: [
        ],
        port: 8080,
        autoWatch: true,
        frameworks: ['jasmine'],
        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
