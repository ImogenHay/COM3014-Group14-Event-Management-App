/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/**/*_tests.ts"],
  verbose: true,
  forceExit: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};