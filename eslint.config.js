import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import astroPlugin from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import react from "eslint-plugin-react";

export default [
  {
    ignores: ["dist/", ".astro/", "node_modules/", "build/"],
  },
  eslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      globals: {
        browser: true,
        node: true,
        es2021: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.astro"],
    plugins: {
      astro: astroPlugin,
    },
    languageOptions: {
      parser: astroParser,
      sourceType: "module",
      globals: {
        Astro: "readonly",
      },
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
    },
  },
];
