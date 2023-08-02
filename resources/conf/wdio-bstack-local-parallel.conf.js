var defaults = require("./wdio.conf.js");
var _ = require("lodash");

timeStamp = new Date().getTime();

var overrides = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  specs: [
    './src/test/suites/login/*.js',
    './src/test/suites/offers/*.js',
    './src/test/suites/product/*.js',
    './src/test/suites/e2e/*.js',
    './src/test/suites/user/*.js',
    './src/test/suites/accessibility/*.js'
  ],
  services: [
    [
      'browserstack',
      {
        testObservability: true,
        browserstackLocal: true,
        testObservabilityOptions: {
                'projectName': 'browserstack-examples-webdriverio',
                'buildName': 'browserstack-examples-webdriverio build',
                'buildTag': 'WDIO'
            },
        opts: {
          forcelocal: false,
          localIdentifier: timeStamp,
        }
      },
    ],
  ],
  baseUrl: 'http://localhost:3000/',
  waitforTimeout: 50000,
  maskCommands: 'setValues, getValues, setCookies, getCookies',
  commonCapabilities: {
    'browserstack.debug': true,
    'browserstack.video': true,
    'browserstack.networkLogs': true,
    acceptInsecureCerts: true,
    "browserstack.localIdentifier": timeStamp,
  },
  capabilities: [{
    maxInstances: 5,
    'browserstack.maskCommands': 'setValues, getValues, setCookies, getCookies',
    os: "OS X",
    os_version: "Catalina",
    browserName: 'Chrome',
    browser_version: "latest",
    acceptInsecureCerts: true,
    // name: (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name', //To set a custom test name
    build: process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio' + " - " + new Date().getTime()
  }],
};

exports.config = _.defaultsDeep(overrides, defaults.config);

exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});