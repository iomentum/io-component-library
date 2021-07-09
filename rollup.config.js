import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import image from "rollup-plugin-image";

import packageJson from "./package.json";

// Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.

export default {
  input: "./src/index.ts", // entry point of the application
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    postcss({
      plugins: [],
      minimize: true,
    }),
    peerDepsExternal(), // automatically externalize peerDependencies in a rollup bundle
    resolve(), // add to the source code our third party dependencies
    commonjs(), // convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    typescript(),
    image(), // import JPG, PNG, GIF and SVG files.
  ],
};
