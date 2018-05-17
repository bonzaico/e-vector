# E-Vector

This is a library to work with two or three dimensional Euclidean vectors.

## Installation

Install using `npm`,

    npm install --save e-vector

## Use as ES Module

    import Vector from "e-vector";

## API Docs

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [Vector](#vector)
    -   [copy](#copy)
    -   [fromAngle](#fromangle)
    -   [equals](#equals)
    -   [mag](#mag)
    -   [magSq](#magsq)
    -   [add](#add)
    -   [sub](#sub)
    -   [mult](#mult)
    -   [div](#div)
    -   [dist](#dist)
    -   [dot](#dot)
    -   [cross](#cross)
    -   [normalize](#normalize)
    -   [setMag](#setmag)
    -   [heading](#heading)
    -   [project](#project)

### Vector

[src/vector.js:38-42](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L38-L42 "Source code on GitHub")

Create a vector by specifying its components.

**Parameters**

-   `x` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Value of the x component
-   `y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Value of the y component
-   `z` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Value of the z component. If it is not provided, it is assumed to be zero (optional, default `0`)

**Examples**

```javascript
const v = Vector(3, 4);
const u = Vector(3, 4, 5);
```

Returns **[Vector](#vector)** 

#### copy

[src/vector.js:57-57](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L57-L57 "Source code on GitHub")

Create a copy of the given vector.

**Parameters**

-   `v` **[Vector](#vector)** The vector to copy

**Examples**

```javascript
var v = Vector(3, 4);
var u = Vector.copy(v);

u.toString(); // Vector(3, 4, 0)
```

Returns **[Vector](#vector)** A vector with the same components as the given vector

#### fromAngle

[src/vector.js:70-70](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L70-L70 "Source code on GitHub")

Create a new _2D_ unit vector from the given angle (in radians).

**Parameters**

-   `angle` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Angle in radians

**Examples**

```javascript
var v = Vector.fromAngle(Math.atan2(4, 3));
v.toString(); // Vector(0.6, 0.8, 0)
```

Returns **[Vector](#vector)** A new vector with heading equal to given angle and a magnitude of 1

#### equals

[src/vector.js:89-89](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L89-L89 "Source code on GitHub")

Check the equality of two vectors.

**Examples**

```javascript
const u = Vector(3, 4);
const v = Vector(4, 5);
const w = Vector(3, 4);

Vector.equals(u, v); // false
Vector.equals(u, w); // true
u === w; // false
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if the vectors are equal

#### mag

[src/vector.js:97-97](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L97-L97 "Source code on GitHub")

Compute the magnitude of the vector.

**Parameters**

-   `v` **[Vector](#vector)** 

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Magnitude of the given vector.

#### magSq

[src/vector.js:105-105](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L105-L105 "Source code on GitHub")

Compute the square of magnitude of the vector.

**Parameters**

-   `v` **[Vector](#vector)** 

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Square of magnitude of the given vector.

#### add

[src/vector.js:114-114](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L114-L114 "Source code on GitHub")

Add two vectors.

**Parameters**

-   `v` **[Vector](#vector)** 
-   `u` **[Vector](#vector)** 

Returns **[Vector](#vector)** Resultant vector.

#### sub

[src/vector.js:123-125](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L123-L125 "Source code on GitHub")

Subtract the second vector from the first.

**Parameters**

-   `v` **[Vector](#vector)** 
-   `u` **[Vector](#vector)** 

Returns **[Vector](#vector)** Vector result of **_`v`_** `-` **_`u`_**.

#### mult

[src/vector.js:134-134](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L134-L134 "Source code on GitHub")

Multiply the vector with a scalar.

**Parameters**

-   `n` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Scalar value to multiply the vector.
-   `v` **[Vector](#vector)** The vector

Returns **[Vector](#vector)** The resultant vector.

#### div

[src/vector.js:143-146](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L143-L146 "Source code on GitHub")

Divide the vector with a scalar.

**Parameters**

-   `n` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Scalar value to divide the vector.
-   `v` **[Vector](#vector)** The vector

Returns **[Vector](#vector)** If the scalar is `0`, return `Vector(0, 0)`, else compute the vector.

#### dist

[src/vector.js:155-157](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L155-L157 "Source code on GitHub")

Compute euclidean distance between two vectors.

**Parameters**

-   `v` **[Vector](#vector)** 
-   `u` **[Vector](#vector)** 

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The distance between **_`v`_** and **_`u`_**.

#### dot

[src/vector.js:167-167](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L167-L167 "Source code on GitHub")

Compute the dot product of two vectors.

**Parameters**

-   `u` **[Vector](#vector)** 
-   `v` **[Vector](#vector)** 

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The result of **_`u`_**`⋅`**_`v`_**.

#### cross

[src/vector.js:177-182](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L177-L182 "Source code on GitHub")

Compute the cross product of two vectors. _Only defined for three dimensional vectors_.

**Parameters**

-   `u` **[Vector](#vector)** 
-   `v` **[Vector](#vector)** 

Returns **[Vector](#vector)** The result of **_`u`_** `×` **_`v`_**.

#### normalize

[src/vector.js:190-190](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L190-L190 "Source code on GitHub")

Change the maagnitude/length of the vector to 1 without changing its angle/direction.

**Parameters**

-   `u` **[Vector](#vector)** 

Returns **[Vector](#vector)** Vector with magnitude of 1 and direction same as **_`u`_**.

#### setMag

[src/vector.js:199-199](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L199-L199 "Source code on GitHub")

Set the magnitude/length of the vector without changing its angle/direction.

**Parameters**

-   `m` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The new magnitude
-   `u` **[Vector](#vector)** The vector

Returns **[Vector](#vector)** A new vector with magnitude of m and direction same as **_`u`_**.

#### heading

[src/vector.js:207-207](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L207-L207 "Source code on GitHub")

Compure the direction/angle of the vector in radians.

**Parameters**

-   `u` **[Vector](#vector)** 

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Angle in radians

#### project

[src/vector.js:216-218](https://github.com/bonzaico/e-vector/blob/a2ce5004e54448cc6f18611b793227b2628a6be3/src/vector.js#L216-L218 "Source code on GitHub")

Returns the projection of the second vection onto the first.

**Parameters**

-   `on` **[Vector](#vector)** The vector on which the second vector will be projected.

Returns **[Vector](#vector)** The projected vector.

## License

See [LICENSE.md](https://github.com/bonzaico/e-vector/blob/master/LICENSE.md)