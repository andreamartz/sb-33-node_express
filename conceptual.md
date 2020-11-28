### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
A:
1. The passing of a callback function allows time-consuming code to run asynchronously. Examples of uses of such callback functions: the functions passed to AJAX requests and the callback function inside the setTimeout() function.
2. using async/await
3. promise chaining

- What is a Promise?
A: a promise is a one-time guarantee of future value. A JavaScript promise is an object that will eventually have one of two values: resolved or rejected. Using promises makes our code less nested and more readable than nested callback functions.

- What are the differences between an async function and a regular function? 
A: 
* An async function always returns a promise; this is not the case for regular functions, which can return anything or nothing at all.
* The code in an async function will not run "out of order" like the code in a regular function would. This means that in an async function the execution is paused while asynchronous code is running.


- What is the difference between Node.js and Express.js?

- What is the error-first callback pattern?

- What is middleware?

- What does the `next` function do?

- What does `RETURNING` do in SQL? When would you use it?

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

1. The requests are sent sequentially, even though they don't need to be since they are all independent of each other.  It would be more efficient to send them all off at the same time.
