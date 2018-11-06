// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import flow from "rollup-plugin-flow";
import commonjs from "rollup-plugin-commonjs";
import builtins from "rollup-plugin-node-builtins";
import preset from "babel-preset-es2015-rollup";

export default {
    output: {
        format: "cjs"
    },
    plugins: [
        flow(),
        resolve({
            preferBuiltins: true
        }),
        babel({
            babelrc: false,
            presets: [["env", { modules: false }]],
            // plugins: ["external-helpers"],
            exclude: "node_modules/**" // only transpile our source code
        }),
        commonjs(),
        builtins()
    ]
};
