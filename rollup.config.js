// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import flow from "rollup-plugin-flow";
import uglify from "rollup-plugin-uglify";

const year = new Date().getFullYear();

const PLUGINS = [
    resolve(),
    flow(),
    babel({
        exclude: "node_modules/**" // only transpile our source code
    })
];

const BANNER = `/*!
* Copyright (c) ${year} Bonzai Digital Pte. Ltd., All rights reserved.
* Licensed under BSD-3-Clause (https://github.com/bonzaico/e-vector/blob/master/LICENSE.md)
*/
`;

export default [{
    output: {
        file: "dist/index.js",
        format: "umd",
        banner: BANNER
    },
    plugins: PLUGINS
}, {
    output: {
        file: "dist/index.esm.js",
        format: "es",
        banner: BANNER
    },
    plugins: PLUGINS
}, {
    output: {
        file: "dist/index.umd.min.js",
        format: "umd",
        banner: BANNER
    },
    plugins: PLUGINS.concat([uglify({
        output: {
            comments: /^!/
        }
    })])
}];
