module.exports = {
  'parser': 'babel-eslint',
  'extends': 'airbnb',
  'plugins': [
    'react',
    'jsx-a11y',
    'import'
  ],
  'env': {
    'browser': true,
    'jest': true,
    'es6': true
  },

  'rules': {
    'no-console': [0],
    'linebreak-style': [0],
    'no-unused-vars': [1],
    'no-param-reassign': [2, { 'props': false }],
    'comma-dangle': [2, 'never'],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js'] }],
    'react/prop-types': [0],
    'func-names': [1, 'never'],
    'arrow-body-style': [1, 'as-needed'],
    'arrow-parens': [1, 'as-needed'],
    'react/jsx-indent': [1, 2],
    'react/jsx-tag-spacing': [1, {
      'closingSlash': 'never',
      'beforeSelfClosing': 'allow',
      'afterOpening': 'never'
    }],
    'react/prefer-stateless-function': [0],
    'no-underscore-dangle': [1],
    'jsx-a11y/interactive-supports-focus': [0],
    'jsx-a11y/label-has-for': [1],
    'react/forbid-prop-types': [1],
    'react/require-default-props': [1],
    'react/no-array-index-key': [1],
    'jsx-a11y/iframe-has-title': [0],
    'class-methods-use-this': [1],
    'jsx-a11y/anchor-has-content': [1],
    'import/no-extraneous-dependencies': [0],
    'react/jsx-space-before-closing': [0],
    'quote-props': [0],
    'import/prefer-default-export': [1],
    'object-curly-spacing': [0],
    'react/jsx-closing-bracket-location': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'no-shadow': [0],
    'jsx-a11y/href-no-hash': [0],
    'no-plusplus': [0]
  }
};
