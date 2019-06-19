/* @flow */

import * as V from "../../e-vector/src/e-vector";
import { Vector as Vec } from "../../vector";

// TODO Should use fantasy-land package.
var fl = {
    equals: 'fantasy-land/equals',
    lte: 'fantasy-land/lte',
    compose: 'fantasy-land/compose',
    id: 'fantasy-land/id',
    concat: 'fantasy-land/concat',
    empty: 'fantasy-land/empty',
    invert: 'fantasy-land/invert',
    filter: 'fantasy-land/filter',
    map: 'fantasy-land/map',
    contramap: 'fantasy-land/contramap',
    ap: 'fantasy-land/ap',
    of: 'fantasy-land/of',
    alt: 'fantasy-land/alt',
    zero: 'fantasy-land/zero',
    reduce: 'fantasy-land/reduce',
    traverse: 'fantasy-land/traverse',
    chain: 'fantasy-land/chain',
    chainRec: 'fantasy-land/chainRec',
    extend: 'fantasy-land/extend',
    extract: 'fantasy-land/extract',
    bimap: 'fantasy-land/bimap',
    promap: 'fantasy-land/promap'
};

export class Vector extends Vec {
    constructor(x: number, y: number, z: number) {
        super(x, y, z);
    }

    equals(b: Vector) {
        return V.equals(this, b);
    }

    // lte(v: Vector) {
    //     if (!(v instanceof Vector)) return false;

    //     return (this.x <= v.x && this.y <= v.y && this.z <= v.z);
    // }

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

Vector.of = (x, y, z) => {
    if (x != null && y != null && z != null) return new Vector(x, y, z);
    else return new Vector(x, x, x);
}
Vector.fromAngle = V.fromAngle;

Vector[fl.of] = Vector.of;

Vector.prototype = Object.assign(Vector.prototype, {
    [fl.equals]: Vector.prototype.equals,
    [fl.lte]: Vector.prototype.lte,
    [fl.map]: Vector.prototype.map,
    [fl.ap]: Vector.prototype.ap,
    [fl.chain]: Vector.prototype.chain
});
