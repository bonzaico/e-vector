import { test } from "tape";
import jsc from "jsverify";
import { allPass, propEq, equals, repeat } from "ramda";

import { check, checkForAll } from "./check";
import Vector from "../src/vector";

const isCloseTo = (x, y, epsilon = 0.001) => (Math.abs(x - y) < epsilon);

test("Vector constructor should create object with x, y & z properties", function (t) {
    check(t, jsc.forall("number", "number", "number", (x, y, z) => {
        var v = Vector(x, y, z);
        return v.x === x && v.y === y && v.z === z;
    }));
    t.end();
});

test("If z is not passed to Vector constructor, then it should be set to zero", function (t) {
    check(t, jsc.forall("number", "number", (x, y) => {
        var v = Vector(x, y);
        return v.x === x && v.y === y && v.z === 0;
    }));
    t.end();
});

test("Vector Laws", t => {
    test("Vector addition is commutative", t => {
        check(t, jsc.forall("number", "number", "number", "number",
            (vx, vy, ox, oy) => {
                const v = Vector(vx, vy);
                const o = Vector(ox, oy);
                const s1 = Vector.add(v, o);
                const s2 = Vector.add(o, v);

                return equals(s1.x, s2.x) && equals(s1.y, s2.y) && equals(s1.z, s2.z);
            }
        ));
        t.end();
    });

    test("Vector addition is associative", t => {
        checkForAll(t, repeat("number", 9),
            (ax, ay, az, bx, by, bz, cx, cy, cz) => {
                const a = Vector(ax, ay, az);
                const b = Vector(bx, by, bz);
                const c = Vector(cx, cy, cz);
                const s1 = Vector.add(Vector.add(a, b), c);
                const s2 = Vector.add(a, Vector.add(b, c));

                return equals(s1.x, s2.x) && equals(s1.y, s2.y) && equals(s1.z, s2.z);
            }
        );
        t.end();
    });

    test("Vector addition with zero yields same vector", t => {
        checkForAll(t, repeat("number", 3), (ax, ay, az) => {
            const a = Vector(ax, ay, az);
            const zero = Vector(0, 0, 0);
            const s = Vector.add(a, zero);

            return isCloseTo(s.x, a.x) && isCloseTo(s.y, a.y) && isCloseTo(s.z, a.z);
        });
        t.end();
    });

    test("Vector addition with negation yields zero vector", t => {
        checkForAll(t, repeat("number", 3), (ax, ay, az) => {
            const a = Vector(ax, ay, az);
            const negA = Vector.mult(-1, a);
            const s = Vector.add(a, negA);

            return equals(s.x, 0) && equals(s.y, 0) && equals(s.z, 0);
        });
        t.end();
    });

    t.end();
});


