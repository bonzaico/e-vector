// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import flow from "rollup-plugin-flow";
import commonjs from "rollup-plugin-commonjs";

export default {
    input: "tests/vector.test.js",
    output: {
        format: "umd",
        name: "Vector"
    },
    plugins: [
        flow(),
        resolve({
            jsnext: true,
            browser: true,
            main: true,
            preferBuiltins: false
        }),
        commonjs(),
        babel({
            exclude: "node_modules/**" // only transpile our source code
        })
    ]
};
