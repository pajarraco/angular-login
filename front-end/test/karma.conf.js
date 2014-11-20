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
            'app/lib/angular-ui-router/release/angular-ui-router.js',
            'app/lib/angular-resource/angular-resource.js',
            'app/lib/angular-animate/angular-animate.js',
            'app/lib/angular-mocks/angular-mocks.js',
            'app/js/**/*.js',
            'app/page/**/*js',
            'test/test/**/*.js'
        ],
        plugins: [
            'karma-jasmine',
            //'karma-firefox-launcher',
            //'karma-opera-launcher',
            //'karma-safari-launcher',
            'karma-chrome-launcher'
        ],
        exclude: [],
        port: 8080,
        frameworks: ['jasmine'],
        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_DEBUG,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            //    'Firefox',
            //    'Safari',
            //    'Opera',
            'Chrome'
        ],
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
