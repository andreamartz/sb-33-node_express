const express = require('express');
let axios = require('axios');
var app = express();

app.use(express.json());

app.post('/', async function(req, res, next) {
  try {
    let results = req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });
    // let userPromiseResultsArr = req.body.developers.map(d => {
    //   return axios
    //     .get(`https://api.github.com/users/${d}`)
    //     .then(res => res)
    //     .catch(err => console.error(err));
    // });
    // let userPromiseResultsArr = req.body.developers.map(async function(d) {
    //   return await axios.get(`https://api.github.com/users/${d}`);
    //     .then(res => res)
    //     .catch(err => console.error(err));
    // });
    // console.log("userPromiseResultsArr: ", userPromiseResultsArr);  // pending promises
    // let end;
    let results = Promise.all(userPromiseResultsArr)
      .then(userResultsArr => {         // userResultsArr contains resolved promises
        // userResultsArr.map(res => res.data.name);
        // console.log(res.data.name);
        console.log("first user's name: ", userResultsArr[0].data.name);
        console.log("first user's bio: ", userResultsArr[0].data.bio);
      })
      .catch(err => console.log("err: ", err));
    console.log("results: ", results);

    return res.send(JSON.stringify(results));
  } catch (err) {
    next(err);
  }
});

app.listen(3000);