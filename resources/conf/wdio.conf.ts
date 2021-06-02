import * as mergeResults from 'wdio-mochawesome-reporter/mergeResults'
export const config = {

  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json'
    },
    // tsconfig-paths is only used if "tsConfigPathsOpts" are provided, if you
    // do please make sure "tsconfig-paths" is installed as dependency
    tsConfigPathsOpts: {
      baseUrl: './'
    }
  },
  runner: 'local',
  specs: [
    ''
  ],
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    acceptInsecureCerts: true
  }],
  logLevel: 'warn',
  coloredLogs: true,
  bail: 0,
  baseUrl: 'https://bstackdemo.com/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  chromeOptions: {
    prefs: {
      "profile.default_content_setting_values.geolocation": 1,
    }
  },
  framework: 'mocha',
  reporters: [[
    'allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
    }],
  ['mochawesome', {
    outputDir: './mocha-report',
    outputFileFormat: function(opts: { cid: unknown; capabilities: unknown; }): string { 
      return `results-${opts.cid}.json`
  }

  }]
  ],
  mochawesomeOpts: {
    includeScreenshots: true,
    screenshotUseRelativePath: true
  },
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  afterTest: function (_test: Record<string, unknown>, _context: Record<string, unknown>, { error }: Record<string, unknown>): void {
    if (error) {
      browser.takeScreenshot();
    }
  },
  // Located in your wdio.conf.js file
onComplete: function (): void {
  mergeResults('./mocha-report', "results-*")
}
}
