var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  specs: [
    './src/test/suites/e2e/e2e.spec.js'
  ],
  services: ['docker',
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
  dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    startDelay: 2000,
    options: {
      p: ['4444:4444'],
      shmSize: '2g'
    }
  },
};

exports.config = _.defaultsDeep(overrides, defaults.config);
exports.config.hostname = 'localhost'
exports.config.port= 4444
exports.config.path= '/wd/hub'
