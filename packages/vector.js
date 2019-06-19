/* @flow */

export class Vector {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z?: number) {
        let obj = this;
        obj.x = x;
        obj.y = y;
        obj.z = z != null ? z : 0;
    }

    toString() {
        return `Vector(${this.x}, ${this.y}, ${this.z})`;
    }
}
