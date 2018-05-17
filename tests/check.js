import jsc from "jsverify";

function is_fn(f) {
    return typeof f === "function";
}

// whee
function opt(x, o, prop, def) {
    return !o ? def : (
        o[prop] ? (
            is_fn(o[prop]) ? o[prop](x) : o[prop]
        ) : def
    );
}

// prop : jsverify property, t : {pass, fail}
export function check(t, prop) {
    const r = jsc.check(prop, { quiet: true });
    if (r === true) t.pass("property holds");
    else t.fail("property does not hold! found counter example: " + r.counterexamplestr);
}

export function checkForAll(t, generators, fn) {
    check(t, jsc.forall.apply(jsc, generators.concat(fn)));
}
