import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  "path",
  "fs",
  "url",
  "process",
];

export default defineConfig([
  // ESM构建
  {
    input: ["src/index.ts", "src/cli.ts"],
    output: {
      dir: "dist/esm",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
    },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.esm.json",
        declaration: true,
        declarationDir: "dist/esm",
      }),
      terser(),
      copy({
        targets: [
          { src: "src/views", dest: "dist/esm" },
        ],
      }),
    ],
    external,
  },
  // CommonJS构建
  {
    input: ["src/index.ts", "src/cli.ts"],
    output: {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: true,
      preserveModules: true,
      entryFileNames: "[name].cjs",
      chunkFileNames: "[name].cjs",
    },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.cjs.json",
        declaration: true,
        declarationDir: "dist/cjs",
      }),
      terser(),
      copy({
        targets: [
          { src: "src/views", dest: "dist/cjs" },
        ],
      }),
    ],
    external,
  },
]);
