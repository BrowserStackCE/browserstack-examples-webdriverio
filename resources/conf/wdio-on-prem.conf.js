var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  testData: [],
  specs: [
    './src/test/suites/e2e/e2e.spec.js'
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
