var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  browserstackLocal: false,
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  specs: [
    './test/specs/plain/*.js'
  ],
  capabilities: [{
    maxInstances: 1,
    'browserstack.debug': true,
    'browserstack.video': true,
    os: "OS X",
    os_version: "Catalina",
    browserName: 'Chrome',
    browser_version: "latest",
    acceptInsecureCerts: true,
    name: 'BStack-Test',
    build: 'BStack Build webdriverio single'
  }],
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    if(passed) {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}');
    } else {
      browser.takeScreenshot();
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}');
    }
  }
};

exports.config = _.defaultsDeep(overrides, defaults.config);
