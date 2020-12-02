# Broken App Issues
1. In the try/catch block, `err` is undefined, because there was no error argument passed to `catch`.
2. `app.use(express.json());` was missing at top of app.js which resulted in Node being unable to parse the incoming request body (`req.body`) and registering it as `undefined`.
3. The `.map` method that runs on the `req.body.developers` array is synchronous, and it doesn't slow down to wait for the promises to resolve. Instead, it returns pending promises. The code, however, is written as though `results` contains the data returned from a resolved promise.
4. There is no error handler.
5. There is no custom Express Error class that can be used to create an error instance.

