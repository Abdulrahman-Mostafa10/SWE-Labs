import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
    transform: {
        '^.+\\.tsx?$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-typescript'] }],
    },
    testMatch: [
        '<rootDir>/src/tests/**/*.test.ts',
        '<rootDir>/dist/tests/**/*.test.js'
    ],
    rootDir: '.',
};

export default config;
