module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
		[
			'@babel/preset-typescript',
			{
				allExtensions: false,
				targets: {
					node: 'current',
				},
			},
		],
	],
};
