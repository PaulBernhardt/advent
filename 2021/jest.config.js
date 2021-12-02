module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	modulePathIgnorePatterns: ['<rootDir>/dist/'],
	collectCoverage: true,
	coverageReporters: ['json-summary'],
};
