/* @flow */

import U from "./utils";

const RAD_TO_DEG = 360 / (2 * Math.PI);

declare class _VectorT {
    x: number,
    y: number,
    z: number,

    (x: number, y: number, z?: number): VectorT,

    magnitude: (v: VectorT) => number,
    add: (v: VectorT, o: VectorT) => VectorT,
    subtract: (v: VectorT, o: VectorT) => VectorT,
    multiply: (n: number, o: VectorT) => VectorT,
    divide: (n: number, o: VectorT) => VectorT,
    distance: (v: VectorT, o: VectorT) => number,
}

export type VectorT = _VectorT;

const Vector: VectorT = (function () {
    const proto = {
        toString: function () {
            return `Vector(${this.x}, ${this.y}, ${this.z})`;
        }
    };
    const construct = function (x: number, y: number, z?: number) {
        var obj = Object.create(proto);
        obj.x = x;
        obj.y = y;
        obj.z = z != null ? z : 0;
        return obj;
    };
    construct.prototype = proto;
    proto.constructor = construct;
    return construct;
}());

/**
 * Create a copy of the given vector.
 *
 * @param {Vector} v 
 * @returns Vector
 */
Vector.copy = (v: VectorT): VectorT => Vector(v.x, v.y, v.z);

/**
 * Create a new 2D unit vector from the given angle (in radians).
 *
 * @param {number} angle Angle in radians
 * @returns {Vector}
 */
Vector.fromAngle = (angle: number): VectorT => Vector(Math.cos(angle), Math.sin(angle));

Vector.mag = (v: VectorT): number => Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

Vector.magSq = (v: VectorT): number => h.sqrt(v.x * v.x + v.y * v.y + v.z * v.z); 

Vector.add = U.curry((v: VectorT, o: VectorT): VectorT => Vector(v.x + o.x, v.y + o.y));

Vector.sub = U.curry((v: VectorT, o: VectorT): VectorT =>
    Vector(v.x - o.x, v.y - o.y)
);

Vector.mult = U.curry((n: number, v: VectorT): VectorT => Vector(v.x * n, v.y * n));

Vector.div = U.curry(
    (n: number, v: VectorT): VectorT =>
        n === 0 ? Vector(0, 0) : Vector(v.x / n, v.y / n)
);

Vector.dist = U.curry((v: VectorT, o: VectorT): number =>
    Math.sqrt(Math.pow(v.x - o.x, 2) + Math.pow(v.y - o.y, 2))
);

Vector.dot = U.curry((v: VectorT, o: VectorT) => v.x * o.x + v.y * o.y);

Vector.cross = U.curry((v: VectorT, o: VectorT) =>
    Vector(
        v.y * o.z - v.z * o.y,
        v.x * o.z - v.z * o.x,
        v.x * o.y - v.y * o.x
    ));

Vector.normalize = U.curry((v: VectorT) => Vector.div(Vector.mag(v), v));

Vector.inRectangle = R.curry((position: VectorT, size: VectorT, point: VectorT) => {
    const bottomRight = Vector.add(position, size);
    return (
        point.x >= position.x &&
        point.y >= position.y &&
        point.x < bottomRight.x &&
        point.y < bottomRight.y
    );
});

export default Vector;

