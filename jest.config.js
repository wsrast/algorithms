module.exports = {
	collectCoverage: true,
	testPathIgnorePatterns: ['<rootDir>/node_modules/'],
	moduleNameMapper: {
		// https://jestjs.io/docs/en/webpack#mocking-css-modules
		'\\.(css|less)$': 'identity-obj-proxy',
	},
	// setupFilesAfterEnv: ['./jest.setup.js'],
};
