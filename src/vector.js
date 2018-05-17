/* @flow */

import U from "./utils";

const RAD_TO_DEG = 360 / (2 * Math.PI);

class VectorT {
    x: number
    y: number
    z: number

    constructor (x: number, y: number, z?: number) {
        var obj = this;
        obj.x = x;
        obj.y = y;
        obj.z = z != null ? z : 0;
    }

    toString () {
        return `Vector(${this.x}, ${this.y}, ${this.z})`
    }
}

/**
 * Create a vector by specifying its components.
 * 
 * @param {number} x Value of the x component
 * @param {number} y Value of the y component
 * @param {number} [z = 0] Value of the z component. If it is not provided, it is assumed to be zero
 * 
 * @returns {Vector}
 * 
 * @example
 * 
 * const v = Vector(3, 4);
 * const u = Vector(3, 4, 5);
 */
const Vector = (function () {
    return (x: number, y: number, z?: number) => {
        return new VectorT(x, y, z);
    }
}());

/**
 * Create a copy of the given vector.
 *
 * @param {Vector} v The vector to copy
 * @returns {Vector} A vector with the same components as the given vector
 * 
 * @example
 * 
 * var v = Vector(3, 4);
 * var u = Vector.copy(v);
 * 
 * u.toString(); // Vector(3, 4, 0)
 */
Vector.copy = (v: VectorT): VectorT => Vector(v.x, v.y, v.z);

/**
 * Create a new _2D_ unit vector from the given angle (in radians).
 *
 * @param {number} angle Angle in radians
 * @returns {Vector} A new vector with heading equal to given angle and a magnitude of 1
 * 
 * @example 
 * 
 * var v = Vector.fromAngle(Math.atan2(4, 3));
 * v.toString(); // Vector(0.6, 0.8, 0)
 */
Vector.fromAngle = (angle: number): VectorT => Vector(Math.cos(angle), Math.sin(angle));

/**
 * Check the equality of two vectors.
 * 
 * @params {Vector} v First vector to compare
 * @params {Vector} u Second vector to compare
 * @returns {boolean} true if the vectors are equal
 * 
 * @example
 * 
 * const u = Vector(3, 4);
 * const v = Vector(4, 5);
 * const w = Vector(3, 4);
 * 
 * Vector.equals(u, v); // false
 * Vector.equals(u, w); // true
 * u === w; // false
 */
Vector.equals = U.curry((v: VectorT, o: VectorT): boolean => (v.x === o.x && v.y === o.y && v.z === o.z));

/**
 * Compute the magnitude of the vector.
 *
 * @param {Vector} v
 * @returns {number} Magnitude of the given vector.
 */
Vector.mag = (v: VectorT): number => Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

/**
 * Compute the square of magnitude of the vector.
 *
 * @param {Vector} v
 * @returns {number} Square of magnitude of the given vector.
 */
Vector.magSq = (v: VectorT): number => (v.x * v.x + v.y * v.y + v.z * v.z); 

/**
 * Add two vectors.
 * 
 * @param {Vector} v
 * @param {Vector} u
 * @returns {Vector} Resultant vector.
 */
Vector.add = U.curry((v: VectorT, o: VectorT): VectorT => Vector(v.x + o.x, v.y + o.y, v.z + o.z));

/**
 * Subtract the second vector from the first.
 * 
 * @param {Vector} v
 * @param {Vector} u
 * @returns {Vector} Vector result of **_`v`_** `-` **_`u`_**.
 */
Vector.sub = U.curry((v: VectorT, o: VectorT): VectorT =>
    Vector(v.x - o.x, v.y - o.y, v.z - o.z)
);

/**
 * Multiply the vector with a scalar.
 * 
 * @param {number} n Scalar value to multiply the vector.
 * @param {Vector} v The vector
 * @returns {Vector} The resultant vector.
 */
Vector.mult = U.curry((n: number, v: VectorT): VectorT => Vector(v.x * n, v.y * n, v.z * n));

/**
 * Divide the vector with a scalar.
 * 
 * @param {number} n Scalar value to divide the vector.
 * @param {Vector} v The vector
 * @returns {Vector} If the scalar is `0`, return `Vector(0, 0)`, else compute the vector.
 */
Vector.div = U.curry(
    (n: number, v: VectorT): VectorT =>
        n === 0 ? Vector(0, 0) : Vector(v.x / n, v.y / n, v.z / n)
);

/**
 * Compute euclidean distance between two vectors.
 * 
 * @param {Vector} v
 * @param {Vector} u
 * @returns {number} The distance between **_`v`_** and **_`u`_**.
 */
Vector.dist = U.curry((v: VectorT, o: VectorT): number =>
    Math.sqrt(Math.pow(v.x - o.x, 2) + Math.pow(v.y - o.y, 2) + Math.pow(v.z - o.z, 2))
);

/**
 * Compute the dot product of two vectors.
 * 
 * 
 * @param {Vector} u
 * @param {Vector} v
 * @returns {number} The result of **_`u`_**` ⋅ `**_`v`_**.
 */
Vector.dot = U.curry((v: VectorT, o: VectorT) => v.x * o.x + v.y * o.y + v.z * o.z);

/**
 * Compute the cross product of two vectors. _Only defined for three dimensional vectors_.
 * 
 * 
 * @param {Vector} u
 * @param {Vector} v
 * @returns {Vector} The result of **_`u`_** `×` **_`v`_**.
 */
Vector.cross = U.curry((v: VectorT, o: VectorT) =>
    Vector(
        v.y * o.z - v.z * o.y,
        v.x * o.z - v.z * o.x,
        v.x * o.y - v.y * o.x
    ));

/**
 * Change the maagnitude/length of the vector to 1 without changing its angle/direction.
 * 
 * @param {Vector} u 
 * @returns {Vector} Vector with magnitude of 1 and direction same as **_`u`_**.
 */
Vector.normalize = (u: VectorT) => Vector.div(Vector.mag(u), u);

/**
 * Set the magnitude/length of the vector without changing its angle/direction.
 * 
 * @param {number} m The new magnitude
 * @param {Vector} u The vector
 * @returns {Vector} A new vector with magnitude of m and direction same as **_`u`_**.
 */
Vector.setMag = U.curry((m: number, u: VectorT) => Vector.mult(m / Vector.mag(u), u));

/**
 * Compure the direction/angle of the vector in radians.
 *
 * @param {Vector} u 
 * @returns {number} Angle in radians
 */
Vector.heading = (u: VectorT) => Math.atan2(u.y, u.x);

/**
 * Returns the projection of the second vection onto the first.
 *
 * @param {Vector} on The vector on which the second vector will be projected.
 * @params {Vector} v Project this vector.
 * @returns {Vector} The projected vector.
 */
Vector.project = U.curry((on: VectorT, v: VectorT) => Vector.mult(
    Vector.dot(on, v) / Vector.magSq(on)
));

Vector.inRectangle = U.curry((position: VectorT, size: VectorT, point: VectorT) => {
    const bottomRight = Vector.add(position, size);
    return (
        point.x >= position.x &&
        point.y >= position.y &&
        point.x < bottomRight.x &&
        point.y < bottomRight.y
    );
});

export default Vector;

