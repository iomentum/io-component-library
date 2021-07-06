import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";

// Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.

export default [
  {
    input: "./src/index.ts", // entry point of the application
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      typescript({ lib: ["es5", "es6", "dom"], target: "es5" }),
      postcss({
        plugins: [],
        minimize: true,
      }),
      babel({
        exlude: "node_modules/**",
        presets: ["@babel/preset-react"],
      }),
      external(), // automatically externalize peerDependencies in a rollup bundle
      resolve(), // add to the source code our third party dependencies
    ],
  },
];
