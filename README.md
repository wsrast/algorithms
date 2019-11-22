# algorithms
Interesting patterns and algorithms I've come across

I've seen some interesting algorithmic problems and patterns lately, and I wanted to create a playground where I could try them out that had all the usual toys like Jest and linting. Here that is.

## Running

Just clone a copy of this, and run `yarn install && yarn test`.

## Compositional Inheritance

I'm starting it out with a pattern one of my old colleagues showed me as an alternative to prototypical or class-based inheritance. The idea is that you start with a base object and *compose* your functionality on top of that until you reach your desired shape. The advantage is that you can write your objects as independent pieces, rather than tightly coupling them to a single parent with the `extends` keyword or referring to a superclass's constructor.
