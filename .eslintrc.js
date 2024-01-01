module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ["*.jsx", "*.js"],
      parserOptions: {
        sourceType: "module",
      },
      rules: {
        "react/prop-types": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "jsx-a11y", "import"],
  rules: {},
  settings: {
    react: {
      version: "detect",
    },
  },
};
