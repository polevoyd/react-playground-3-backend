'use strict';

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello, Alex!'));

app.get('/tweets', (req, res) => {

  res.send('something');

  /*---------------------------------------------------------------*/
  /*                        TWITTER API                            */
  /*---------------------------------------------------------------*/
   const twitter_api_proxy = `https://api.twitter.com/1.1/search/tweets.json?q=sobaka`;
   geocode = long, lat, radius

   const twitter_api_proxy = `https://api.twitter.com/1.1/search/tweets.json?geocode=37.781157,-122.398720,1mi`;
   const bearer_token_proxy = config.REACT_APP_TWITTER_BEARER_TOKEN_TEXT;
   fetch(twitter_api_proxy, {
     headers: {
       "Authorization": "Bearer " + bearer_token_proxy
     }
   })
   .then(response => response.json())
   .then(response => {
     console.log(response);
   })
});

app.listen(port, () => console.log(`Listening on port ${port}!`));