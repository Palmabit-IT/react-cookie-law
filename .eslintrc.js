module.exports = {
  root: true,
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'import',
    '@typescript-eslint',
  ],
  overrides: [{
    files: ['*.spec.ts', '*.spec.tsx', 'webpack.config.ts'],
    plugins: ['jest'],
    env: { 'jest/globals': true },
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  }],
  env: {
    node: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx'],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
      tsx: 'never',
    }],
    'no-use-before-define': 0,
    'react/prop-types': [0],
    'react/jsx-props-no-spreading': 'off',
    'linebreak-style': 0,
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};
