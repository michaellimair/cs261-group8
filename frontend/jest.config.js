/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  rootDir: '.',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '**/*.tsx',
    '!**/node_modules/*',
  ],
  coverageThreshold: {
    branches: 90,
    functions: 90,
    lines: 90,
    statements: 90,
  },
  resetMocks: false,
};
