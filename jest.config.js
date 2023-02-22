//** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    testEnvironment: 'jest-environment-jsdom'
};