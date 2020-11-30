const express = require('express');
let axios = require('axios');
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());

async function gitDevInfo(dev) {
  // send off request to GitHub API to get info on a dev
  try {
    let url = `https://api.github.com/users/${dev}`;
    const res = await axios.get(url);
    console.log("name: ", res.data.name, "bio: ", res.data.bio);
    return {name: res.data.name, bio: res.data.bio};
  } catch (e) {
    next(e);
  }
}

app.post('/', async function(req, res, next) {
  try {
    let results = [];
    for (dev of req.body.developers) {
      const res = await gitDevInfo(dev);
      results.push(res);
    }
    console.log("results: ", results);
    // let results = req.body.developers.map(async d => {
    //   return await axios.get(`https://api.github.com/users/${d}`);
    // });
    // console.log("results: ", results);
    // let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    // console.log("out: ", out);

    // return res.send(JSON.stringify(out));
    return res.json(results);
  } catch (e) {
    next(err);
  }
});

/** 404 handler */

// app.use(function (req, res, next) {
//   return new ExpressError("Not Found", 404);
// });

/** general error handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

app.listen(3000);
