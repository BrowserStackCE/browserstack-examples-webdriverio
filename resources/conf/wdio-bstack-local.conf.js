var defaults = require("./wdio.conf.js");
var browserstack = require('browserstack-local');
var _ = require("lodash");

timeStamp = new Date().getTime();

var overrides = {
  onBrowserstack: true,
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  specs: [
    './src/test/suites/e2e/e2e.spec.js'
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
  capabilities: [{
    maxInstances: 1,
    'browserstack.maskCommands':'setValues, getValues, setCookies, getCookies',
    'browserstack.debug': true,
    'browserstack.video': true,
    'browserstack.networkLogs': true,
    "browserstack.localIdentifier": timeStamp,
    os: "OS X",
    os_version: "Catalina",
    browserName: 'Chrome',
    browser_version: "latest",
    acceptInsecureCerts: true,
    // name: (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name', //To set a custom test name
    build: process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio' + " - " + new Date().getTime()
  }],
}

exports.config = _.defaultsDeep(overrides, defaults.config);
