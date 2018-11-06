import { test } from "tape";
import { Vector } from "../src/e-vector-fl";

const { identity, composition } = require("fantasy-land/laws/functor");

const equals = (a, b) => a.x === b.x && a.y === b.y && a.z === b.z;

test("Vector is a Functor", function (t) {
    t.ok(identity(Vector.of, equals, new Vector(1, 2, 3)), "Obeys Functor identity law");
    t.ok(composition(
        Vector.of,
        equals,
        v => v.add(Vector.of(1, 1, 1)),
        v => v.add(Vector.of(1, 1, 1)),
        new Vector(1, 2, 3)
    ), "Obeys Functor composition law");
    t.end();
});
