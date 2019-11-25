# algorithms

Interesting patterns and algorithms I've come across

I've seen some interesting algorithmic problems and patterns lately, and I wanted to create a playground where I could try them out that had all the usual toys like Jest and linting. Here that is.

## Running

Just clone a copy of this, and run `yarn install && yarn test`.

## Compositional Inheritance

I'm starting it out with a pattern one of my old colleagues showed me as an alternative to prototypical or class-based inheritance. The idea is that you start with a base object and _compose_ your functionality on top of that until you reach your desired shape. The advantage is that you can write your objects as independent pieces, rather than tightly coupling them to a single parent with the `extends` keyword or referring to a superclass's constructor.

## Convert an Object Tree to a Flat Array

I recently had a requirement where I needed to convert a JS object tree into a flat array so that I could display it as a simple HTML table in an email. An extra bit of difficulty was added because I needed to maintain the Hierarchy for the end user by concatenating the names of each tree level together. The result desired was something like:

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
| x    |       |
| x/y  | 2     |
| x/z  | 3     |
| y    | 10    |
| ...  |
