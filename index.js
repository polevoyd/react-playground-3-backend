'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello, Alex!'));
app.get('/tweets', (req, res) => {

  res.send('something');



  const twitter_api = 'https://api.twitter.com/1.1/search/tweets.json?geocode=37.781157,-122.398720,1mi';


  var request = require('request');
  var bearer_token = process.env.TWITTER_BEARER_TOKEN;

  console.log(bearer_token);

//   var options = {
//     method: 'GET',
//     url: twitter_api,
//     qs: {
//       'screen_name': 'twitterapi'
//     },
//     json: true,
//     headers: {
//       'Authorization': 'Bearer ' + bearer_token
//     }
//   };

//   request(options, function(error, response, body) {
//     console.dir(body);
//   });



});

app.listen(port, () => console.log(`Listening on port ${port}!`));

