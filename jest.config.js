/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.stories.{js,jsx,ts,tsx}'],
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  reporters: ['default', 'jest-junit'],
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/test/mock/styleMock.js',
  },
  testMatch: ['<rootDir>/**/?(*.)(test).{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'],
};
