var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  specs: [
    './src/test/suites/login/*.js',
    './src/test/suites/offers/*.js',
    './src/test/suites/prodcut/*.js',
    './src/test/suites/e2e/*.js',
    './src/test/suites/user/*.js'
  ],
};

exports.config = _.defaultsDeep(overrides, defaults.config);
