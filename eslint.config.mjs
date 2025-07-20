import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 👇 Add your custom rule levels here
  {
    rules: {
      "no-console": "warn", // warning instead of error
      "react-hooks/exhaustive-deps": "warn", // if this one bothers you
    },
  },
];

export default eslintConfig;
