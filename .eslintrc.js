module.exports = {
	root: true,

	env: {
		node: true,
		es6: true
	},

	rules: {
		// own for ES6
		'comma-dangle': 'off',
		quotes: 'off',
		'no-undef': 'off',
		'no-console': 'off',
		'no-case-declarations': 'off',
		'no-unused-vars': 'off',
		'no-tabs': 'off',
		semi: 'off',
		'no-underscore-dangle': 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'spaced-comment': 'off',
		'object-curly-newline': 'off',
		'no-multi-assign': 'off',
		'no-plusplus': 'off',
		'no-param-reassign': 'off',
		'no-use-before-define': 'off',
		'implicit-arrow-linebreak': 'off',
		'class-methods-use-this': 'off',
		'no-nested-ternary': 'off',
		'arrow-parens': ['warn', 'always'],
		'max-len': 'off',
		'no-prototype-builtins': 'off',
		'linebreak-style': 'off',
		'no-unmodified-loop-condition': 'off',
		'vue/require-default-prop': 'off',
		'vue/require-prop-types': 'off',

		// *.vue files
		// base indent at <script> tag
		'vue/script-indent': [
			'warn',
			'tab',
			{
				baseIndent: 1,
				switchCase: 1,
			}
		],
		// attributes per line indent setting
		'vue/html-indent': [
			'warn',
			'tab',
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: []
			}
		],
		// freedom, becouse sometime we want (need) attributes in single line (design attributes or analytics, ...)
		'vue/max-attributes-per-line': [
			'warn',
			{
				singleline: 99,
				multiline: 1
			}
		],
		// allow <v-button>CTA</v-button>
		'vue/singleline-html-element-content-newline': 'off',
		// <br /> :)
		'vue/html-self-closing': [
			'warn',
			{
				html: {
					void: 'always'
				}
			}
		],
		'vue/valid-v-slot': [
			'error',
			{
				allowModifiers: true
			}
		]
	},

	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: '2018'
	},

	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)'],
			env: {
				mocha: true
			}
		},
		{
			files: ['*.vue'],
			rules: {
				indent: 'off'
			}
		}
	],

	extends: ['plugin:vue/essential', 'plugin:vue/recommended', '@vue/typescript']
}
