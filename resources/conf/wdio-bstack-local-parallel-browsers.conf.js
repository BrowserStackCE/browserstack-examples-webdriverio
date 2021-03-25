var defaults = require("./wdio.conf.js");
var browserstack = require('browserstack-local');
var _ = require("lodash");

const currentDateTime = new Date()
const timeStamp = currentDateTime.getDay().toString() + currentDateTime.getMonth().toString() + currentDateTime.getFullYear().toString() + 
        currentDateTime.getHours().toString() + currentDateTime.getMinutes().toString() + currentDateTime.getSeconds().toString() +
        currentDateTime.getMilliseconds().toString()

var overrides = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  specs: [
    './src/test/suites/login/*.js',
    './src/test/suites/offers/*.js',
    './src/test/suites/product/*.js',
    './src/test/suites/e2e/*.js',
    './src/test/suites/user/*.js'
  ],
  host: 'hub.browserstack.com',
  maskCommands: 'setValues, getValues, setCookies, getCookies',
  capabilities: [{
    os: "OS X",
    os_version: "Catalina",
    browserName: 'Chrome',
    browser_version: "latest",
    name: 'parallel_test',
    build: 'webdriverio-browserstack',
  },{
    device: "Samsung Galaxy S20",
    os_version: "10.0",
    real_mobile: "true",
    browserName: 'Android',
    name: 'parallel_test',
    build: 'webdriverio-browserstack',
  },{
    os: "Windows",
    os_version: "10",
    browserName: 'Chrome',
    browser_version: "latest",
    name: 'parallel_test',
    build: 'webdriverio-browserstack',
  },{
    device: "iPhone 12",
    os_version: "14",
    real_mobile: "true",
    browserName: 'iPhone',
    name: 'parallel_test',
    build: 'webdriverio-browserstack',
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
  beforeEach: function () {
    browser.url('http://localhost:3000/');
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
