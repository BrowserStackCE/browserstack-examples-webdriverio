var defaults = require("./wdio.conf.js");
var _ = require("lodash");
var fs = require('fs');

var overrides = {
  testData: [],
  specs: [
    './test/specs/plain/login-datadriven.spec.js'
  ],
  beforeSession: function (config, capabilities, specs) {
    console.log('Reqading CSV file')
    return new Promise((resolve) => {
        setTimeout(() => {
            fs.readFile('/Users/Swapn/TU/browserstack-TU-WebdriverIO/test/res/user.csv', 'utf8', function(err, fileContents) {
              if (err) throw err;
              testData = fileContents.split('\r\n')
              testData.shift()
            });
            resolve()
        }, 5000)
    })
},
};

exports.config = _.defaultsDeep(overrides, defaults.config);
