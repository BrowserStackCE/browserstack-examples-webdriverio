var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  specs: [
    './test/specs/plain/*.js'
  ],
  capabilities: [{
    maxInstances: 5
  }],
};

exports.config = _.defaultsDeep(overrides, defaults.config);
