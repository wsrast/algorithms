# algorithms

Interesting patterns and algorithms I've come across

I've seen some interesting algorithmic problems and patterns lately, and I wanted to create a playground where I could try them out that had all the usual toys like Jest and linting. Here that is.

## Running

Just clone a copy of this, and run `yarn install && yarn test`.

## Compositional Inheritance

I'm starting it out with a pattern one of my old colleagues showed me as an alternative to prototypical or class-based inheritance. The idea is that you start with a base object and _compose_ your functionality on top of that until you reach your desired shape. The advantage is that you can write your objects as independent pieces, rather than tightly coupling them to a single parent with the `extends` keyword or referring to a superclass's constructor.

Code here: [composition.js](src/composition/composition.js).

## Convert an Object Tree to a Flat Array

I recently had a requirement where I needed to convert a JS object tree into a flat array so that I could display it as a simple HTML table in an email. An extra bit of difficulty was added because I needed to maintain the Hierarchy for the end user by concatenating the names of each tree level together.

Code here: [treetoarray.js](src/treetoarray/treetoarray.js).

The result desired was something like:

```js
{
	x: {
		y: 2,
		z: 3
	},
	y: 10
}
```

to:

| Name | Value |
| ---- | ----- |
| x/y  | 2     |
| x/z  | 3     |
| y    | 10    |
| ...  |

## Simple Factorial Function

Interviewers seem fascinated by factorial functions, so here's a simple version of the recursive part as a one-liner, with the tests in the associated folder.

```js
const factorial = num => (num <= 1 ? 1 : num * factorial(num - 1));
```

## Find the Lowest Missing Number

Another one I've run into in interviews is to find the lowest missing positive number in an array that includes postive and negative numbers up to Math.MAX_SAFE_NUMBER. This sounded very simple to me, then very complicated. Later, after the interview, I realized there's a very simple solution to this thanks to `Array.includes()`.

Code here: [lowestmissing.js](src/lowestmissing/lowestmissing.js)

## Intersected Strings

Write a function that reads two strings, each containing comma-separated lists of numbers in ascending order, then returns an array of all intersecting values. These intersecting values are defined as the same integer at the same index position in both arrays.

Example: [1,3,4,5,13], and [1,8,11,12,13] would return [1,13].

Code here: [intersect.ts](src/intersect/intersect.ts). I've also added some TypeScript support to this one, just to tinker with it since it's now easier to integrate with Babel.

## Deep vs. Shallow Copy

Most cloning methods deal with shallow copies (copies which share references with their source object), which can cause subtle and elusive bugs. Having a way of making deep copies that you can rely on to remain encapsulated and unique is an important tool to have in your arsenal. Below is a series of options.

### Shallow Copies

Some ways you can make a shallow copy of an object:

1. Use Object.assign().
1. Use the spread operator.

### Deep Copies

Most of the strategies commonly used for making deep copies of objects are flawed, but continue to be used since they appear on the surface to work. In particular, the JSON stringify/parse pattern is thought of as a clever hack, but while it produces a true deep copy in a separate memory space, it fails to reproduce simple user-defined methods. If you use JS prototypes or the `Object.defineProperty()` method, you will most certainly run afoul of these problems if you stick to non-recursive copies.

Options for copying objects:

| Method               | Deep | Copies Non-enum | Copies Methods | Copies Prototype Props |
| -------------------- | ---- | --------------- | -------------- | ---------------------- |
| Object.assign()      | no   | no              | yes            | no                     |
| Spread operator      | no   | no              | yes            | no                     |
| Ramda/Lodash         | yes  | yes             | yes            | yes                    |
| for...in loop        | no   | no              | yes            | yes                    |
| JSON stringify/parse | yes  | no              | no             | no                     |
