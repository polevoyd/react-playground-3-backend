'use strict';

require('dotenv').config();

const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello, Alex!'));

/*-------------------------------------------------------------*/
//        GET
/*-------------------------------------------------------------*/

app.get('/tweets', (req, res) => {

  let arrayOfTweets = [];
  const twitter_api = 'https://api.twitter.com/1.1/search/tweets.json?geocode=37.781157,-122.398720,1mi';
  const bearer_token = process.env.TWITTER_BEARER_TOKEN;

  const options = {
    method: 'GET',
    url: twitter_api,
    qs: {
      'screen_name': 'twitterapi'
    },
    json: true,
    headers: {
      'Authorization': 'Bearer ' + bearer_token
    }
  };


  request(options, function(error, response, body) {

    // Here we need to construct a 'tweet' object and push it to an array

    const arrayOfTweets = body.statuses.map( tweet => {

      return {
        created_at : tweet.created_at,
        text: tweet.text,
        entities: tweet.entities,
        geo: tweet.geo,
        coordinates: tweet.coordinates
      };
    }).filter( tweet => tweet.entities.media );

    console.log(arrayOfTweets);
    res.send(arrayOfTweets);
  });




});




/*-------------------------------------------------------------*/
//        ENTRY POINT
/*-------------------------------------------------------------*/


app.listen(port, () => console.log(`Listening on port ${port}!`));

