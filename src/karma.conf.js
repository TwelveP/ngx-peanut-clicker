/** @type {import('karma').ConfigOptions} */
const customConfig = {
    basePath: '.',
    files: [
        'app/**/*.spec.ts'
    ],
    reporters: [
        'progress',
        'kjhtml',
        'spec', // console reporter
        'coverage'
    ],
    plugins: [
        require('karma-coverage'),
        require('karma-jasmine'),
        require('karma-jasmine-html-reporter'),
        require('karma-spec-reporter'),
        require('karma-chrome-launcher'),
        require('karma-firefox-launcher'),
        require('@angular-devkit/build-angular/plugins/karma')
    ],
    frameworks: [
        'jasmine',
        '@angular-devkit/build-angular'
    ],
    client: {
        clearContext: false
    },
    coverageReporter: {
        dir: require('path').join(__dirname, '../coverage/'),
        reporters: [
            { type: 'html' },
            { type: 'text-summary' }
        ]
    }
};
module.exports = (config) => config.set(customConfig);
