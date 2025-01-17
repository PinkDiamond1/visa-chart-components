import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
// import typescript2 from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.ts',
		output: {
			name: 'visa-charts-utils',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			resolve(),
			commonjs({
				include:['./node_modules/yup/lib/index.js',
						'./node_modules/synchronous-promise/index.js',
						'./node_modules/property-expr/index.js',
						'node_modules/toposort/index.js',
						'node_modules/ua-parser-js/src/ua-parser.js'
						]
					}),  // so Rollup can convert `ms` to an ES module			
			// typescript2(),
			typescript({ include: '**/*.{ts,js}' }), // so Rollup can convert TypeScript to JavaScript
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify 
	// `file` and `format` for each target)
	{
		input: 'src/index.ts',
		external: [],
		plugins: [
			// typescript2(),
			typescript(), // so Rollup can convert TypeScript to JavaScript
		],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];
