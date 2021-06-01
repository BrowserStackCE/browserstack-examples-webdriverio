import { config as defaultConfig } from './wdio.conf';
import * as _ from 'lodash';

const overrides = {
  testData: [],
  specs: [
    './src/test/suites/login/*.ts',
    './src/test/suites/offers/*.ts',
    './src/test/suites/product/*.ts',
    './src/test/suites/e2e/*.ts',
    './src/test/suites/user/*.ts'
  ],
};

export const config = _.defaultsDeep(overrides, defaultConfig);
