import { config as defaultConfig } from './wdio.conf';
import * as _ from 'lodash';
import * as parseArgs from 'minimist';

const overrides = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  specs: [
    './src/test/suites/login/*.ts',
    './src/test/suites/offers/*.ts',
    './src/test/suites/product/*.ts',
    './src/test/suites/e2e/*.ts',
    './src/test/suites/user/*.ts'
  ],
  host: 'hub.browserstack.com',
  commonCapabilities: {
    maxInstances: 5,
    'browserstack.maskCommands': 'setValues, getValues, setCookies, getCookies',
    'browserstack.debug': true,
    'browserstack.video': true,
    'browserstack.networkLogs': true,
    acceptInsecureCerts: true,
    name: (parseArgs(process.argv.slice(2)))['bstack-session-name'] || 'default_name',
    build: process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio' + " - " + new Date().getTime()
  },
  capabilities: [{
    os: "OS X",
    os_version: "Catalina",
    browserName: 'Chrome',
    browser_version: "latest",
  }, {
    device: "Samsung Galaxy S20",
    os_version: "10.0",
    real_mobile: "true",
    browserName: 'Android',
  }, {
    os: "Windows",
    os_version: "10",
    browserName: 'Chrome',
    browser_version: "latest",
  }, {
    device: "iPhone 12",
    os_version: "14",
    real_mobile: "true",
    browserName: 'iPhone',
  }],
  afterTest: function (_test: Record<string, unknown>, _context: Record<string, unknown>, { passed, error }: Record<string, unknown>) {
    if ((parseArgs(process.argv.slice(2)))['bstack-session-name']) {
      browser.executeScript("browserstack_executor: {\"action\": \"setSessionName\", \"arguments\": {\"name\":\"" +
        (parseArgs(process.argv.slice(2)))['bstack-session-name'] + "\" }}");
    } else {
      browser.executeScript("browserstack_executor: {\"action\": \"setSessionName\", \"arguments\": {\"name\":\"" + _test.title + "\" }}");
    }

    if (passed) {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}');
    } else {
      browser.takeScreenshot();
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed. ' + error + '"}}');
    }
  }
};

export const config = _.defaultsDeep(overrides, defaultConfig);

config.capabilities.forEach(function (caps: { [x: string]: unknown; }) {
  for (const i in config.commonCapabilities) caps[i] = caps[i] || config.commonCapabilities[i];
});
