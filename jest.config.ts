export default {
  preset: 'ts-jest',
  esModuleInterop: 'true',
  allowSyntheticDefaultImports: 'true',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/', "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
};