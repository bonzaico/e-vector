/* @flow */

import U from "./utils";
import { Vector as VectorT } from "../../vector";

const {
    PI,
    sin, cos, atan2,
    sqrt, pow,
    mRound, mCeil, mFloor, mAbs
} = Math;

export const RAD_TO_DEG = 360 / (2 * PI);

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
export const Vector = (function () {
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
export const copy = (v: VectorT): VectorT => Vector(v.x, v.y, v.z);

/**
 * Create a new _2D_ unit vector from the given angle (in radians).
 *
 * @param {number} angle Angle in radians
 * @returns {Vector} A new vector with heading equal to given angle and a magnitude of 1
 * 
 * @example 
 * 
 * var v = Vector.fromAngle(atan2(4, 3));
 * v.toString(); // Vector(0.6, 0.8, 0)
 */
export const fromAngle = (angle: number): VectorT => Vector(cos(angle), sin(angle));

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
export const equals = U.curry((v: VectorT, o: VectorT): boolean => (v.x === o.x && v.y === o.y && v.z === o.z));

/**
 * Compute the magnitude of the vector.
 *
 * @param {Vector} v
 * @returns {number} Magnitude of the given vector.
 */
export const mag = (v: VectorT): number => sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

/**
 * Compute the square of magnitude of the vector.
 *
 * @param {Vector} v
 * @returns {number} Square of magnitude of the given vector.
 */
export const magSq = (v: VectorT): number => (v.x * v.x + v.y * v.y + v.z * v.z); 

/**
 * Add two vectors.
 * 
 * @param {Vector} v
 * @param {Vector} u
 * @returns {Vector} Resultant vector.
 */
export const add = U.curry((v: VectorT, o: VectorT): VectorT => Vector(v.x + o.x, v.y + o.y, v.z + o.z));

/**
 * Subtract the second vector from the first.
 * 
 * @param {Vector} v
 * @param {Vector} u
 * @returns {Vector} Vector result of **_`v`_** `-` **_`u`_**.
 */
export const sub = U.curry((v: VectorT, o: VectorT): VectorT =>
    Vector(v.x - o.x, v.y - o.y, v.z - o.z)
);

/**
 * Multiply the vector with a scalar.
 * 
 * @param {number} n Scalar value to multiply the vector.
 * @param {Vector} v The vector
 * @returns {Vector} The resultant vector.
 */
export const mul = U.curry((n: number, v: VectorT): VectorT => Vector(v.x * n, v.y * n, v.z * n));

/**
 * Divide the vector with a scalar.
 * 
 * @param {number} n Scalar value to divide the vector.
 * @param {Vector} v The vector
 * @returns {Vector} If the scalar is `0`, return `Vector(0, 0)`, else compute the vector.
 */
export const div = U.curry(
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
export const dist = U.curry((v: VectorT, o: VectorT): number =>
    sqrt(pow(v.x - o.x, 2) + pow(v.y - o.y, 2) + pow(v.z - o.z, 2))
);

/**
 * Compute the dot product of two vectors.
 * 
 * 
 * @param {Vector} u
 * @param {Vector} v
 * @returns {number} The result of **_`u`_**` ⋅ `**_`v`_**.
 */
export const dot = U.curry((v: VectorT, o: VectorT) => v.x * o.x + v.y * o.y + v.z * o.z);

/**
 * Compute the cross product of two vectors. _Only defined for three dimensional vectors_.
 * 
 * 
 * @param {Vector} u
 * @param {Vector} v
 * @returns {Vector} The result of **_`u`_** `×` **_`v`_**.
 */
export const cross = U.curry((v: VectorT, o: VectorT) =>
    Vector(
        v.y * o.z - v.z * o.y,
        v.x * o.z - v.z * o.x,
        v.x * o.y - v.y * o.x
    ));

/**
 * Change the magnitude/length of the vector to 1 without changing its angle/direction.
 * 
 * @param {Vector} u 
 * @returns {Vector} Vector with magnitude of 1 and direction same as **_`u`_**.
 */
export const normalize = (u: VectorT) => Vector.div(Vector.mag(u), u);

/**
 * Set the magnitude/length of the vector without changing its angle/direction.
 * 
 * @param {number} m The new magnitude
 * @param {Vector} u The vector
 * @returns {Vector} A new vector with magnitude of m and direction same as **_`u`_**.
 */
export const setMag = U.curry((m: number, u: VectorT) => Vector.mul(m / Vector.mag(u), u));

/**
 * Compute the direction/angle of the vector in radians.
 *
 * @param {Vector} u 
 * @returns {number} Angle in radians
 */
export const heading = (u: VectorT) => atan2(u.y, u.x);

/**
 * Returns the projection of the second vector onto the first.
 *
 * @param {Vector} on The vector on which the second vector will be projected.
 * @params {Vector} v Project this vector.
 * @returns {Vector} The projected vector.
 */
export const project = U.curry((on: VectorT, v: VectorT) => Vector.mul(
    Vector.dot(on, v) / Vector.magSq(on)
));

/**
 * Returns new vector with it's components rounded.
 * 
 * @param {Vector} u
 * @returns {Vector} v
 * 
 * @example
 * 
 * var u = Vector(10.2, 10.9);
 * var roundedVector = Vector.round(u);
 * console.log(roundedVector); // Vector(10, 11)
 */
export const round = ((u: VectorT) => Vector(mRound(u.x), mRound(u.y), mRound(u.z)));

/**
 * Returns new vector with the nearest non-fractional values for the components.
 * 
 * @param {Vector} u
 * @returns {Vector} v
 * 
 * @example
 * 
 * var u = Vector(10.2, 10.9);
 * var ceilVector = Vector.ceil(u);
 * console.log(ceilVector); // Vector(11, 11)
 */
export const ceil = ((u: VectorT) => Vector(mCeil(u.x), mCeil(u.y), mCeil(u.z)));

/**
 * Returns new vector with the nearest smaller non-fractional values for the components.
 * 
 * @param {Vector} u
 * @returns {Vector} v
 * 
 * @example
 * 
 * var u = Vector(10.2, 10.9);
 * var floorVector = Vector.floor(u);
 * console.log(floorVector); // Vector(10, 10)
 */
export const floor = ((u: VectorT) => Vector(mFloor(u.x), mFloor(u.y), mFloor(u.z)));

/**
 * Returns new vector with the absolute values for the components.
 * 
 * @param {Vector} u
 * @returns {Vector} v
 * 
 * @example
 * 
 * var u = Vector(-5, 10);
 * var absVector = Vector.abs(u);
 * console.log(absVector); // Vector(5, 10)
 */
export const abs = ((u: VectorT) => Vector(abs(u.x), abs(u.y), abs(u.z)));

export const inRectangle = U.curry((position: VectorT, size: VectorT, point: VectorT) => {
    const bottomRight = Vector.add(position, size);
    return (
        point.x >= position.x &&
        point.y >= position.y &&
        point.x < bottomRight.x &&
        point.y < bottomRight.y
    );
});
