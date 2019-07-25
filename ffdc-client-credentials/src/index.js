const express = require('express');
const fetch = require('node-fetch');
global.Headers = fetch.Headers;

// any non undefined value in param will force manual client configuration
const issuer = require('./openIdIssuer')();
issuer.defaultHttpOptions = { timeout: 3500 }

const app = express();
var port = 5000;

let client;
let token;

issuer.then(issuer => {
  client = new issuer.Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  });

  app.listen(port, () => console.log(`Sample app listening on port ${port}!`));
});

app.get('/', async (req, res, next) => {
  // Check for token validity
  var new_token_needed = true;
  if (token !== null && token !== undefined) new_token_needed = token.expired();

  // ask for a token if needed
  if (new_token_needed) {
    token = await client.grant({
      grant_type: 'client_credentials',
      scope: 'openid'
    });
  }

  let countries;
  var base_url = process.env.BASE_URL;

  try {
    const response = await fetch(base_url + "/referential/v1/countries", {
      method: 'get',
      headers: new Headers({
        Authorization: 'Bearer ' + token.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    countries = await response.json();
  } catch (error) {
    console.log(error);
  }

  res.send(countries);
});