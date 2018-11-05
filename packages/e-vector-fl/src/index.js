/* @flow */

import * as V from "e-vector";
import fl from "fantasy-land";
import { Vector as Vec } from "../../vector";

export class Vector extends Vec {
    constructor(x: number, y: number, z: number) {
        super(x, y, z);
    }

    equals(b: Vector) {
        return V.equals(this, b);
    }

    lte(v: Vector) {
        if (!(v instanceof Vector)) return false;

        if (this.x <= v.x) return true;
        if (this.y <= v.y) return true;
        if (this.z <= v.z) return true;

        return false;
    }

    map(f: (m: number) => number) {
        return new Vector(f(this.x), f(this.y), f(this.z));
    }

    ap(b: Vector) {
        return new Vector(b.x(this.x), b.y(this.y), b.z(this.z));
    }

    chain(f: (m: number) => Vector) {
        return new Vector(f(this.x).x, f(this.y).y, f(this.z).z);
    }

    add(v: Vector) {
        return V.add(this, v);
    }
    sub(v: Vector) {
        return V.sub(this, v);
    }
    dist(v: Vector) {
        return V.dist(this, v);
    }
    dot(v: Vector) {
        return V.dot(this, v);
    }
    cross(v: Vector) {
        return V.cross(this, v);
    }
    project(v: Vector) {
        return V.project(this, v);
    }

    mul(n: number) {
        return V.mul(n, this);
    }
    div(n: number) {
        return V.mul(n, this);
    }
    setMag(n: number) {
        return V.setMag(n, this);
    }

    copy() {
        return V.copy(this);
    }
    mag() {
        return V.mag(this);
    }
    magSq() {
        return V.magSq(this);
    }
    normalize() {
        return V.normalize(this);
    }
    heading() {
        return V.heading(this);
    }
    round() {
        return V.round(this);
    }
    ceil() {
        return V.ceil(this);
    }
    floor() {
        return V.floor(this);
    }
    abs() {
        return V.abs(this);
    }
}

Vector.of = (x, y, z) => new Vector(x, y, z);
Vector.fromAngle = V.fromAngle;

Vector[fl.of] = Vector.of;

Vector.prototype = Object.assign(Vector.prototype, {
    [fl.equals]: Vector.prototype.equals,
    [fl.lte]: Vector.prototype.lte,
    [fl.map]: Vector.prototype.map,
    [fl.ap]: Vector.prototype.ap,
    [fl.chain]: Vector.prototype.chain
});
