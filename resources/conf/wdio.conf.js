var fs = require('fs');
const accounts = require('../data/user.json')

exports.config = {
  accounts: accounts,
  runner: 'local',
  specs: [
    ''
  ],
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    acceptInsecureCerts: true
  }],
  logLevel: 'warn',
  coloredLogs: true,
  bail: 0,
  baseUrl: 'https://bstackdemo.com/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  chromeOptions: {
    prefs: {
      "profile.default_content_setting_values.geolocation": 1,
    }
  },
  framework: 'mocha',
  reporters: [['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false,
  }]],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  beforeSession: function (config, capabilities) {
  },
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    if (error) {
      browser.takeScreenshot();
    }
  }
}
