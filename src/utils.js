/* @flow */

function curry(fn) {
    return function resolve() {
        var that = this;
        var args = Array.prototype.slice.apply(arguments);
        if (args.length < fn.length) {
            return function next() {
                var currArgs = Array.prototype.slice.apply(arguments);
                if (args.length + currArgs.length >= fn.length) {
                    return fn.apply(that, args.concat(currArgs));
                }

                if (args.length + currArgs.length < fn.length) {
                    return resolve.apply(that, args.concat(currArgs));
                }
            };
        } else {
            return fn.apply(that, args);
        }
    }
}

export default {
    curry
};