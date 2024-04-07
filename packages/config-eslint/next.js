const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    "eslint-config-turbo",
    // "next/core-web-vitals",
    // "prettier",
    // "plugin:tailwindcss/recommended"
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "no-param-reassign": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unnecessary-condition": "warn",
    "no-promise-executor-return":"warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-misused-promises": "warn",
    "no-unused-vars": "warn",
    "jsx-a11y/anchor-has-content": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-shadow": "warn",
    "no-console": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "jsx-a11y/heading-has-content": "off",
    "react/no-unstable-nested-components": "warn",
    "no-nested-ternary": "off",
    "turbo/no-undeclared-env-vars": "off",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/naming-convention": "off",
    "no-alert": "warn",
    "no-constant-binary-expression": "warn",
    "jsx-a11y/click-events-have-key-events": "off",
    "eqeqeq": "warn",
    "prefer-named-capture-group": "warn",
    "jsx-a11y/no-static-element-interactions": "off",
    "eslint-comments/require-description": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/require-await": "warn",
    "import/named": "warn",
    "array-callback-return": "warn",
    "@typescript-eslint/await-thenable": "warn",
    "@typescript-eslint/no-confusing-void-expression": "warn",
    "import/no-cycle": "warn",
    "no-useless-escape": "warn",
    "no-redeclare": "warn",
    "no-extra-boolean-cast": "warn"
  },
};


// {
//   "$schema": "https://json.schemastore.org/eslintrc",
//   "root": true,
//   "extends": [
//     "next/core-web-vitals",
//     "prettier",
//     "plugin:tailwindcss/recommended"
//   ],
//   "plugins": ["tailwindcss", "import"],
//   "rules": {
//     "tailwindcss/no-custom-classname": "off",
//     "tailwindcss/classnames-order": "off",
//     "import/no-unused-modules": [1, { "unusedExports": true }]
//   },
//   "settings": {
//     "tailwindcss": {
//       "callees": ["cn", "cva"],
//       "config": "tailwind.config.js"
//     }
//   },
//   "overrides": [
//     {
//       "files": ["*.ts", "*.tsx"],
//       "parser": "@typescript-eslint/parser"
//     }
//   ]
// }

// // TODO: dead code detection

// // https://blog.logrocket.com/how-detect-dead-code-frontend-project/
