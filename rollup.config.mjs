import autoExternal from "rollup-plugin-auto-external";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import nodePolyfills from "rollup-plugin-node-polyfills";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from "@rollup/plugin-json";

export default [
  {
    input: `src/index.ts`,
    plugins: [
      autoExternal(),
      commonjs(),
      esbuild(),
      json(),
      nodePolyfills(),
      nodeResolve({ jsnext: true, preferBuiltins: false, browser: true }),
    ],
    output: [
      {
        format: "esm",
        dir: "dist/esm",
        entryFileNames: "index.mjs",
      },
      {
        format: "cjs",
        dir: "dist/cjs",
      },
    ],
  },
  {
    input: `src/index.ts`,
    plugins: [dts()],
    output: {
      file: `dist/index.d.ts`,
      format: "es",
    },
  },
];