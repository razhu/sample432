const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/*.spec.ts'], // Test files end with .spec.ts by convention
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      lines: 50,
      functions: 50,
    },
  },
};

module.exports = config;
