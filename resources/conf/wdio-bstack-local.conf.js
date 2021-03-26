var defaults = require("./wdio.conf.js");
var browserstack = require('browserstack-local');
var _ = require("lodash");

const currentDateTime = new Date()
const timeStamp = currentDateTime.getDate().toString() + currentDateTime.getMonth().toString() + currentDateTime.getFullYear().toString() + 
        currentDateTime.getHours().toString() + currentDateTime.getMinutes().toString() + currentDateTime.getSeconds().toString() +
        currentDateTime.getMilliseconds().toString()

var overrides = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  specs: [
    './src/test/suites/e2e/e2e.spec.js'
  ],
  host: 'hub.browserstack.com',
  baseUrl: 'http://localhost:3000/',
  capabilities: [{
    maxInstances: 1,
    'browserstack.maskCommands':'setValues, getValues, setCookies, getCookies',
    'browserstack.debug': true,
    'browserstack.video': true,
    'browserstack.local': true,
    'browserstack.networkLogs': true,
    "browserstack.localIdentifier": timeStamp,
    os: "OS X",
    os_version: "Catalina",
    browserName: 'Chrome',
    browser_version: "latest",
    acceptInsecureCerts: true,
    name: (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || (((require('minimist')(process.argv.slice(2)))['_'])[0].split('/').reverse())[0] +
          " - " + new Date().toISOString(),
    build: process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio' + " - " + new Date().toISOString()
  }],
  onPrepare: function (config, capabilities) {
    console.log("Connecting local");
    return new Promise(function (resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({ 'key': exports.config.key, 'localIdentifier': timeStamp }, function (error) {
        if (error) return reject(error);

        console.log('Connected. Now testing...');
        resolve();
      });
    });
  },
  onComplete: function (capabilties, specs) {
    return new Promise(function(resolve, reject){
      exports.bs_local.stop(function() {
        console.log("Binary stopped");
        resolve();
      });
    });
  },
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    if(passed) {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}');
    } else {
      browser.takeScreenshot();
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}');
    }
  }
}

exports.config = _.defaultsDeep(overrides, defaults.config);
