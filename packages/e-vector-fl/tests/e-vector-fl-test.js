import { test } from "tape";
import { Vector } from "../src/e-vector-fl";
import jsc from "../../jsverify";
import { check, checkForAll } from "../../check";
import { allPass, propEq, repeat, curry } from "ramda";

const laws = require("fantasy-laws");

const approxEq = (v1, v2, epsilon = 0.0001) => Math.abs(v1 - v2) < epsilon;
const equals = (a, b) => approxEq(a.x, b.x) && approxEq(a.y, b.y) && approxEq(a.z, b.z);
const VectorArb = arb => jsc.tuple(repeat(arb, 3)).smap(
    ([x, y, z]) => Vector.of(x, y, z),
    v => [v.x, v.y, v.z]
);
const VectorArbNum = VectorArb(jsc.number);

test("Vector is a Setoid", function (t) {
    const { reflexivity, symmetry, transitivity } = laws.Setoid;
    t.doesNotThrow(
        reflexivity(VectorArbNum),
        "Reflexivity"
    );
    t.doesNotThrow(
        symmetry(VectorArbNum, VectorArbNum),
        "Symmetry"
    );
    t.doesNotThrow(
        transitivity(VectorArbNum, VectorArbNum, VectorArbNum),
        "Transitivity"
    );
    t.end();
});

test("Vector is a Functor", function (t) {
    const { identity, composition } = laws.Functor(equals);
    t.doesNotThrow(
        identity(VectorArbNum),
        "Identity"
    );
    t.doesNotThrow(
        composition(VectorArbNum, jsc.fn(jsc.number), jsc.fn(jsc.number)),
        "Composition"
    );
    t.end();
});

// test("Vector is a Ord", function (t) {
//     const { totality, antisymmetry, transitivity } = laws.Ord;
//     t.doesNotThrow(
//         totality(VectorArbNum, VectorArbNum),
//         "Totality"
//     );
//     t.doesNotThrow(
//         antisymmetry(VectorArbNum, VectorArbNum),
//         "Antisymmetry"
//     );
//     t.doesNotThrow(
//         transitivity(VectorArbNum, VectorArbNum, VectorArbNum),
//         "Transitivity"
//     );
//     t.end();
// });

test("Vector is an Apply", function (t) {
    const { composition } = laws.Apply(equals);
    const sq = x => x * x;
    const succ = x => x + 1;
    t.doesNotThrow(
        composition(VectorArb(jsc.fn(jsc.number)), VectorArb(jsc.fn(jsc.number)), VectorArbNum),
        "Composition"
    );
    t.end();
});

test("Vector is an Applicative", function (t) {
    const { identity, homomorphism, interchange } = laws.Applicative(equals, Vector);
    const sq = x => x * x;
    const succ = x => x + 1;
    t.doesNotThrow(
        identity(VectorArbNum),
        "Identity"
    );
    t.doesNotThrow(
        homomorphism(jsc.fn(jsc.number), VectorArbNum),
        "Homomorphism"
    );
    t.doesNotThrow(
        interchange(VectorArb(jsc.fn(jsc.number)), jsc.number),
        "Interchange"
    );
    t.end();
});

test("Vector is a Chain", function (t) {
    const { associativity } = laws.Chain(equals);
    const sq = x => Vector.of(x * x);
    const succ = x => Vector.of(x + 1);
    t.doesNotThrow(
        associativity(VectorArbNum, jsc.constant(sq), jsc.constant(succ)),
        "Associativity"
    );
    t.end();
});

test("Vector is a Monad", function (t) {
    const { leftIdentity, rightIdentity } = laws.Monad(equals, Vector);
    const sq = x => Vector.of(x * x);
    const succ = x => Vector.of(x + 1);
    t.doesNotThrow(
        leftIdentity(jsc.constant(sq), jsc.number),
        "Left Identity"
    );
    t.doesNotThrow(
        rightIdentity(VectorArbNum),
        "Right Identity"
    );
    t.end();
});
