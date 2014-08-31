exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
    // 'browserName': 'phantomjs',
    // 'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs',

  },

  onPrepare: function() {
    // browser.driver.manage().window().setSize(1280, 1024);
  },

  baseUrl: 'http://0.0.0.0:9000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
