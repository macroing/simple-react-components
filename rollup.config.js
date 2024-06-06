import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import { babel } from "@rollup/plugin-babel";

export default {
  input: "./index.js",
  output: [
    {
      file: "dist/index.js",
      format: "es"
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    postcss({
      extensions: [".css"]
    }),
    terser(),
    babel({babelHelpers: "bundled", exclude: "node_modules/**", presets: [["@babel/preset-react", {"runtime": "automatic"}]]})
  ]
}
