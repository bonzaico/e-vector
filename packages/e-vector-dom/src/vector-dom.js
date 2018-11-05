/* @flow */

import * as Vector from "e-vector";
import type VectorT from "e-vector";

const elCenter = (el: HTMLElement): VectorT => {
    const docElem = document.documentElement;
    const win: window = window;

    const box = el.getBoundingClientRect();

    // Get center of element. Copied from jQuery, no idea how it works.
    return Vector(
        box.left +
            (win.pageXOffset || (docElem ? docElem.scrollLeft : 0)) -
            (docElem ? docElem.clientLeft || 0 : 0) +
            el.offsetWidth / 2,
        box.top +
            (win.pageYOffset || (docElem ? docElem.scrollTop : 0)) -
            (docElem ? docElem.clientTop || 0 : 0) +
            el.offsetHeight / 2
    );
};

export const mousePositionFromEvent = (e: MouseEvent) =>
    Vector(e.clientX, e.clientY);

export const positionFromClientRect = (rect: ClientRect): VectorT =>
    Vector(rect.left, rect.top);

/**
 * Find the angle between the given vector and the center of an DOM element
 *
 * @param el
 * @param v
 * @returns {number} Angle in degrees
 */
export const elAngle = (el: HTMLElement, v: VectorT): number =>
    [el]
        .map(elCenter)
        .map(Vector.subtract(v))
        .map(Vector.heading)
        .reduce((_, x) => x);
