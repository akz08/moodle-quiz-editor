exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'phantomjs',

    'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs',

  },

  baseUrl: 'http://0.0.0.0:9000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
