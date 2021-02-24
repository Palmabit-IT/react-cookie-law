module.exports = {
  root: true,
  extends: [
    'airbnb',
    'plugin:jest/recommended',
  ],
  plugins: [
    'import',
    'jest',
  ],
  env: {
    node: true,
    browser: true,
    'jest/globals': true,
  },
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'import/prefer-default-export': 'off',
    'react/prop-types': [0],
    'react/jsx-props-no-spreading': 'off',
    'linebreak-style': 0,
  },
};
