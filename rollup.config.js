import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import { babel } from "@rollup/plugin-babel";
import preserveDirectives from "rollup-plugin-preserve-directives";

export default {
  input: "./index.js",
  output: [
    {
      dir: "dist/index",
      exports: "named",
      format: "es",
      preserveModules: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    postcss({
      extensions: [".css"],
    }),
    babel({ babelHelpers: "bundled", exclude: "node_modules/**", presets: [["@babel/preset-react", { runtime: "automatic" }]] }),
    preserveDirectives(),
    terser(),
  ],
};
