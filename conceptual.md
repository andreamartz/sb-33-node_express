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
* The code in an async function will not run "out of order" like the code in a regular function could. This means that in an async function the execution is paused while asynchronous code is running, but that pause doesn't happen in regular functions.


- What is the difference between Node.js and Express.js?

A: Node.js is a server-side implementation of JavaScript, but it can be used for more purposes than just web development. Express is a framework for Node that is specifically for web development.

- What is the error-first callback pattern?

A: The error-first callback pattern is a common pattern in Node libraries and other built-in tools where a callback runs after a process runs successfully or results in an error.  It gets its name because the callback takes two parameters, and the first one is the error object (or null if no error occurred), which will be supplied by Node. The second is the data that a successful process produces.

- What is middleware?

A: Middleware is code that runs after a request comes in and before the response goes out (i.e., in the _middle_ of the request/response cycle). The code is a function(s) that has access to the request and response objects and which can call the _'next'_ function.

- What does the `next` function do?

A: When the `next` function is executed, it tells the server to go on to the next matching 'thing', which might be a route (if no argument is passed) or an error handler. If any argument is passed to `next`, Express will treat it as an error and go to the next error handler it finds.

- What does `RETURNING` do in SQL? When would you use it?

A: I did not see this anywhere in the curriculum to date.  Having said that, a little online research indicates that the return statement terminates a SQL procedure. After modifying a database, returning the modified value(s) is a way of retrieving them. Returning just makes the process of retrieving the values more efficient, because otherwise a SELECT statement would be needed after the process of making the change has finished.

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

2. The code is not DRY. It would be better to 
  a. define an asynchronous helper function using async/await that makes the API call and uses a try/catch block for error handling.
  b. define a const variable to hold the base url, which is `https://api.github.com/users/`
  c. rewrite the main function to take an array of users as an argument and call the helper function for each user.

4. The requests are written with jQuery, which we would be less likely to use on the server-side than the client-side (I think).