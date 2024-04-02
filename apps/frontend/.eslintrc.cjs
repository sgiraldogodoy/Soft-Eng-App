module.exports = {
  env: { browser: true, es2020: true },
  extends: ["custom", "plugin:react-hooks/recommended"],
  root: true,
  parserOptions: { ecmaVersion: "ESNext", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "react-hooks/exhaustive-deps": "error",
  },
  ignorePatterns: ["src/components/ui/*"],
};
