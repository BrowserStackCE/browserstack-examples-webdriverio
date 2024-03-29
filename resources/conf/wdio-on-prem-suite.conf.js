var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  testData: [],
  specs: [
    './src/test/suites/login/*.js',
    './src/test/suites/offers/*.js',
    './src/test/suites/product/*.js',
    './src/test/suites/e2e/*.js',
    './src/test/suites/user/*.js',
    './src/test/suites/accessibility/*.js'
  ],
  services: [
    ['browserstack', {
        testObservability: true,
        testObservabilityOptions: {
            user: process.env.BROWSERSTACK_USERNAME,
            key: process.env.BROWSERSTACK_ACCESS_KEY,
            projectName: 'browserstack-examples-webdriverio',
            buildName: 'browserstack-examples-webdriverio build',
            buildTag: 'WDIO'
        },
    }]
  ],
};

exports.config = _.defaultsDeep(overrides, defaults.config);
