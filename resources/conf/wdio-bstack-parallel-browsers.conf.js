var defaults = require("./wdio.conf.js");
var _ = require("lodash");

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
  services: [['browserstack']],
  commonCapabilities: {
    maxInstances: 1,
    'browserstack.maskCommands':'setValues, getValues, setCookies, getCookies',
    'browserstack.debug': true,
    'browserstack.video': true,
    'browserstack.networkLogs': true,
    acceptInsecureCerts: true,
    // name: (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name', //To set a custom test name
    build: process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio' + " - " + new Date().getTime()
  },
  capabilities: [{
    os: "OS X",
    os_version: "Catalina",
    browserName: 'Chrome',
    browser_version: "latest",
  },{
    device: "Samsung Galaxy S20",
    os_version: "10.0",
    real_mobile: "true",
    browserName: 'Android',
  },{
    os: "Windows",
    os_version: "10",
    browserName: 'Chrome',
    browser_version: "latest",
  },{
    device: "iPhone 12",
    os_version: "14",
    real_mobile: "true",
    browserName: 'iPhone',
  }],
};

exports.config = _.defaultsDeep(overrides, defaults.config);

exports.config.capabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
