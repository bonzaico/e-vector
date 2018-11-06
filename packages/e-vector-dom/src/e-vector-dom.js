/* @flow */

import * as V from "e-vector";
import type VectorT from "e-vector";

/**
 * Get center of an HTML element as a Vector, relative to the viewport.
 * 
 * @param {HTMLElement} el 
 * @returns {Vector}
 */
const elCenter = (el: HTMLElement): VectorT => {
    const docElem = document.documentElement;
    const win: window = window;

    const box = el.getBoundingClientRect();

    // Get center of element. Copied from jQuery, no idea how it works.
    return V.Vector(
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

/**
 * Create a vector of the mouse position from the event object of a mouse event.
 *
 * @param {MouseEvent} e Event object
 * @returns {Vector}
 * 
 * @example 
 * 
 * el.addEventListener("mousedown", e => {
 *     const position = Vector.mousePositionFromEvent(e);
 * });
 */
export const mousePositionFromEvent = (e: MouseEvent) =>
    V.Vector(e.clientX, e.clientY);

/**
 * Create a vector for the position of a client rectangle.
 *
 * @param {ClientRect} rect 
 * @returns {Vector}
 * 
 * @example 
 * 
 * const position = Vector.positionFromClientRect(el.getBoundingClientRect());
 */
export const positionFromClientRect = (rect: ClientRect): VectorT =>
    V.Vector(rect.left, rect.top);

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
        .map(V.subtract(v))
        .map(V.heading)
        .reduce((_, x) => x);
