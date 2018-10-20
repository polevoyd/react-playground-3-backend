'use strict';

require('dotenv').config();
const express = require('express');
const request = require('request');
const app = express();
const port = 4000;

/*-------------------------------------------------------------*/
//        GET
/*-------------------------------------------------------------*/

app.get('/tweets', (req, res) => {

  // Variables to accept:
  // Latitude, Longitude, Radius (in miles)

  console.log(req.query);

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
        entities: tweet.entities,
        geo: tweet.geo,
        coordinates: tweet.coordinates
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

