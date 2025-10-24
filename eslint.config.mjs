// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginPrettier from "eslint-plugin-prettier";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,               // ESLint base rules
  pluginReact.configs.flat.recommended, // React rules
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node, },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
      // ✅ Register react-hooks plugin properly here
      "react-hooks": pluginReactHooks,
    },
    rules: {
      "prettier/prettier": "error",
      semi: ["error", "always"],
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-multiple-empty-lines": [
        "error",
        { max: 1, maxBOF: 0, maxEOF: 0 },
      ],
      "no-console": "off",
      "no-useless-concat": "error",
      "no-array-constructor": "error",
      "no-new-object": "error",
      "no-var": "error",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",      // ✅ Now works
      "react-hooks/exhaustive-deps": "error",     // ✅ Now works
      "react/no-unescaped-entities": "off",
      "react/jsx-handler-names": [
        "error",
        {
          eventHandlerPrefix: "handle",
          eventHandlerPropPrefix: "on",
        },
      ],
    },
  },
  prettier, // ✅ always last
]);
