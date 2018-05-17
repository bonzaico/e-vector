(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Vector = factory());
}(this, (function () { 'use strict';

  /*       */

  var curry = function curry(fn) {
      return function resolve() {
          var that = this;
          var args = Array.prototype.slice.apply(arguments);
          if (args.length < fn.length) {
              return function next() {
                  var currArgs = Array.prototype.slice.apply(arguments);
                  if (args.length + currArgs.length >= fn.length) {
                      return fn.apply(that, args.concat(currArgs));
                  }

                  if (args.length + currArgs.length < fn.length) {
                      return resolve.apply(that, args.concat(currArgs));
                  }
              };
          } else {
              return fn.apply(that, args);
          }
      };
  };

  var U = {
      curry: curry
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  /*       */

  var RAD_TO_DEG = 360 / (2 * Math.PI);

  var VectorT = function () {
      function VectorT(x, y, z) {
          classCallCheck(this, VectorT);

          var obj = this;
          obj.x = x;
          obj.y = y;
          obj.z = z != null ? z : 0;
      }

      createClass(VectorT, [{
          key: "toString",
          value: function toString() {
              return "Vector(" + this.x + ", " + this.y + ", " + this.z + ")";
          }
      }]);
      return VectorT;
  }();

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


  var Vector = function () {
      return function (x, y, z) {
          return new VectorT(x, y, z);
      };
  }();

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
  Vector.copy = function (v) {
      return Vector(v.x, v.y, v.z);
  };

  /**
   * Create a new 2D unit vector from the given angle (in radians).
   *
   * @param {number} angle Angle in radians
   * @returns {Vector} A new vector with heading equal to given angle and a magnitude of 1
   * 
   * @example 
   * 
   * var v = Vector.fromAngle(Math.atan2(4, 3));
   * v.toString(); // Vector(0.6, 0.8, 0)
   */
  Vector.fromAngle = function (angle) {
      return Vector(Math.cos(angle), Math.sin(angle));
  };

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
  Vector.equals = U.curry(function (v, o) {
      return v.x === o.x && v.y === o.y && v.z === o.z;
  });

  Vector.mag = function (v) {
      return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  };

  Vector.magSq = function (v) {
      return v.x * v.x + v.y * v.y + v.z * v.z;
  };

  Vector.add = U.curry(function (v, o) {
      return Vector(v.x + o.x, v.y + o.y, v.z + o.z);
  });

  Vector.sub = U.curry(function (v, o) {
      return Vector(v.x - o.x, v.y - o.y, v.z - o.z);
  });

  Vector.mult = U.curry(function (n, v) {
      return Vector(v.x * n, v.y * n, v.z * n);
  });

  Vector.div = U.curry(function (n, v) {
      return n === 0 ? Vector(0, 0) : Vector(v.x / n, v.y / n, v.z / n);
  });

  Vector.dist = U.curry(function (v, o) {
      return Math.sqrt(Math.pow(v.x - o.x, 2) + Math.pow(v.y - o.y, 2) + Math.pow(v.z - o.z, 2));
  });

  Vector.dot = U.curry(function (v, o) {
      return v.x * o.x + v.y * o.y + v.z * o.z;
  });

  Vector.cross = U.curry(function (v, o) {
      return Vector(v.y * o.z - v.z * o.y, v.x * o.z - v.z * o.x, v.x * o.y - v.y * o.x);
  });

  Vector.normalize = function (v) {
      return Vector.div(Vector.mag(v), v);
  };

  Vector.setMag = U.curry(function (m, v) {
      return Vector.mult(m / Vector.mag(v), v);
  });

  Vector.heading = function (v) {
      return Math.atan2(v.y, v.x);
  };

  Vector.project = U.curry(function (on, v) {
      return Vector.mult(Vector.dot(on, v) / Vector.magSq(on));
  });

  Vector.inRectangle = U.curry(function (position, size, point) {
      var bottomRight = Vector.add(position, size);
      return point.x >= position.x && point.y >= position.y && point.x < bottomRight.x && point.y < bottomRight.y;
  });

  return Vector;

})));
