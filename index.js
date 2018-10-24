'use strict';

require('dotenv').config();
const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 4000;

/*-------------------------------------------------------------*/
//        CORS REQUEST FIX
/*-------------------------------------------------------------*/

app.use((request, response, next) => {

  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/*-------------------------------------------------------------*/
//        GET
/*-------------------------------------------------------------*/

app.get('/tweets', (req, res) => {

  // Variables to accept:
  // Latitude, Longitude, Radius (in miles)

  const latitude = req.query.lat;      // 37.781157
  const longitude = req.query.lng;    // -122.398720
  const twitter_api = `https://api.twitter.com/1.1/search/tweets.json?geocode=${latitude},${longitude},100mi&count=100`;
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

  // Request and filter a data then

  request(options, function(error, response, body) {

    const arrayOfTweets = body.statuses.map( tweet => {

      return {
        created_at : tweet.created_at,
        text: tweet.text,
        picture: tweet.entities.media ? tweet.entities.media : undefined,
        user: tweet.user.screen_name,
        url: tweet.url ? tweet.url : undefined
      };
    });
 
    // Sending back array of tweet objects
    res.send(arrayOfTweets);
  });
});

/*-------------------------------------------------------------*/
//        ENTRY POINT
/*-------------------------------------------------------------*/

app.listen(port, () => console.log(`Listening on port ${port}!`));

