module.exports = {
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	extends: ['airbnb'],
	plugins: [
		'import',
		'prettier',
	],
	// settings: {
	// 	'import/resolver': {
	// 		webpack: {
	// 			config: path.join(__dirname, 'config', 'webpack.base.config.js'),
	// 		},
	// 	},
	// },
	rules: {
		'linebreak-style': 'off', // Don't play nicely with Windows.
		'comma-dangle': ["error", "always"],
		'arrow-parens': 'off', // Incompatible with prettier
		'object-curly-newline': 'off', // Incompatible with prettier
		'no-mixed-operators': 'off', // Incompatible with prettier
		'arrow-body-style': 'off', // Not our taste?
		'function-paren-newline': 'off', // Incompatible with prettier
		'no-plusplus': 'off',
		'space-before-function-paren': 0, // Incompatible with prettier
		'quotes': ["error", "single", { "allowTemplateLiterals": true }],
		'max-len': ['error', 100, 2, { ignoreUrls: true, }], // airbnb is allowing some edge cases
		'no-console': 'error', // airbnb is using warn
		'no-alert': 'error', // airbnb is using warn
		'no-param-reassign': 'off', // Not our taste?
		'no-underscore-dangle': 0,
		'array-bracket-spacing': ["error", "always"],
		
		// 'prettier/prettier': ['error'],
	},
};
