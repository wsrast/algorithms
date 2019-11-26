# algorithms

Interesting patterns and algorithms I've come across

I've seen some interesting algorithmic problems and patterns lately, and I wanted to create a playground where I could try them out that had all the usual toys like Jest and linting. Here that is.

## Running

Just clone a copy of this, and run `yarn install && yarn test`.

## Compositional Inheritance

I'm starting it out with a pattern one of my old colleagues showed me as an alternative to prototypical or class-based inheritance. The idea is that you start with a base object and _compose_ your functionality on top of that until you reach your desired shape. The advantage is that you can write your objects as independent pieces, rather than tightly coupling them to a single parent with the `extends` keyword or referring to a superclass's constructor.

Code here: [composition.js](composition/composition.js).

## Convert an Object Tree to a Flat Array

I recently had a requirement where I needed to convert a JS object tree into a flat array so that I could display it as a simple HTML table in an email. An extra bit of difficulty was added because I needed to maintain the Hierarchy for the end user by concatenating the names of each tree level together.

Code here: [treetoarray.js](treetoarray/treetoarray.js).

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

Code here: [lowestmissing.js](lowestmissing/lowestmissing.js)
