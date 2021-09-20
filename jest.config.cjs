module.exports = {
  bail: true,
  transform: {},
  verbose: true,
  preset: 'ts-jest/presets/js-with-ts-esm', // or other ESM presets,
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    }
  }
};
