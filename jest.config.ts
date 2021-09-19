import type { Config } from '@jest/types';

/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
const config: Config.InitialOptions = {
  transform: {},
  verbose: true,
  preset: 'ts-jest/presets/js-with-ts-esm',
  extensionsToTreatAsEsm: ['.ts'],
  timers: 'fake',
  maxWorkers: 2,
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};

export default config;
