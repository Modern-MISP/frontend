module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsdoc'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  rules: {
    'no-warning-comments': 'warn',
    'no-console': 'warn'
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    {
      files: ['*.svelte'],
      excludedFiles: ['*.story.svelte', '+page.svelte', '+layout.svelte', '+error.svelte'],
      extends: ['plugin:jsdoc/recommended-typescript'],
      rules: {
        // Require jsDoc comments on exports, so they show up in UML and possibly the markdown document.
        // I'm not sure this is a good idea, but the lint can also be satisfied by using an empty comment
        // like `/** */`, which signifies that the comment was intentionally left blank.
        'jsdoc/require-jsdoc': [
          'warn',
          {
            publicOnly: true,
            contexts: [
              // 'ExportNamedDeclaration:has(VariableDeclaration)',
              // 'ExportNamedDeclaration:has(ExportSpecifier)'
              'ExportNamedDeclaration' // In case this is too generic, use the two contexts above
            ]
          }
        ],
        // eslint doesn't recognize generics in svelte files and throws this error incorrectly.
        // Disabled because typescript handles this anyways.
        'no-undef': 'off'
      }
    },
    {
      files: ['*.story.svelte'],
      rules: {
        // eslint incorrectly applies this rule in story files because
        // the `Hst` export and its type have the same name.
        // Possible solutions to this would be importing the type under
        // a different name via `as` (but that doesn't seem worth it)
        // or putting the type import directly into the export expression, like so:
        // `export let Hst: import('@histoire/plugin-svelte').Hst`;
        'no-import-assign': 'off'
      }
    }
  ]
};
