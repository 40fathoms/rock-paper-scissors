module.exports = {
  semi: true,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  jsxSingleQuote: false,
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  trailingComma: 'none',
  proseWrap: 'always',
  tailwindFunctions: ['tv', 'cn'],
  tailwindConfig: './tailwind.config.cjs',
  plugins: ['prettier-plugin-tailwindcss']
};
