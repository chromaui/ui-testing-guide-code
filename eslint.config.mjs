import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier, // Prettier 설정 추가 (ESLint와 충돌 방지)
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      "prettier/prettier": "error", // Prettier 적용
      "react/react-in-jsx-scope": "off",
      "react/no-deprecated": "off",
      "react/no-deprecated" : "off"
    }
  }
];
