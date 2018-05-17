// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import flow from "rollup-plugin-flow";

export default {
    input: "src/vector",
    output: {
        file: "dist/index.js",
        format: "umd",
        name: "Vector"
    },
    plugins: [
        resolve(),
        flow(),
        babel({
            exclude: "node_modules/**" // only transpile our source code
        })
    ]
};