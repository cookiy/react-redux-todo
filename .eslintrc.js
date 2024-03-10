module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:react-hooks/recommended'
	],
	plugins: ['@typescript-eslint', 'react', 'react-hooks'],
	env: {
		browser: true,
		node: false,
		es6: true,
		jest: true
	},
	globals: {
		NodeJS: true,
		require: true,
		process: true,
		$request: true,
		$message: true
	},
	settings: {
		react: {
			pragma: 'React',
			version: 'detect'
		}
	},
	parserOptions: {
		// 指定ESLint可以解析JSX语法
		ecmaVersion: 2019,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
		"eqeqeq": "warn",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "react/prop-types": "off"
	}
}
