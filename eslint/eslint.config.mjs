import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
	{
		ignores: [
			'**/external-a/**', //
			'**/external-b/**',
		],
	},

	{
		extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx,js,jsx}'],
	},

	eslintPluginPrettierRecommended,
);
