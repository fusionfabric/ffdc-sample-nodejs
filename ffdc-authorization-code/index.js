'use strict';

const simpleOauthModule = require('simple-oauth2');
const fetch = require('node-fetch');
const express = require('express');
const app = express();

global.Headers = fetch.Headers;

const callbackUrl = process.env.REDIRECT_URI;

const oauth2 = simpleOauthModule.create({
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  },
  auth: {
    tokenHost: process.env.BASE_URL,
    tokenPath: process.env.TOKEN_ENDPOINT,
    authorizePath: process.env.AUTHORIZATION_ENDPOINT,
  }
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('pages/index'));

app.get('/login', (req, res) => {
  // Authorization uri definition
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: callbackUrl,
    scope: process.env.SCOPE,
  });

  res.redirect(authorizationUri);
});

app.get('/logout', (req, res) => {
  // Cleanup access token
  access_token = '';

  // Back to index file
  res.redirect('/');
});

let access_token = '';

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', async (req, res, next) => {
  const code = req.query.code;
  const options = {
    code,
    redirect_uri: callbackUrl,
  };

  try {
    const result = await oauth2.authorizationCode.getToken(options);
    const accessToken = oauth2.accessToken.create(result);
    console.log('The resulting token: ', result);

    access_token = accessToken.token.access_token;

  } catch (error) {
    return res.render('pages/error', { error: error.message });
  }

  res.render('pages/auth', { token: access_token });
});

app.get('/results', async (req, res, next) => {

  var url = process.env.BASE_URL + '/capital-market/trade-capture/static-data/v1/reference-sources?applicableEntities=legal-entities';

  const response = await fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: 'Bearer ' + access_token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  });

  if (!response.ok) {
    return res.render('pages/error', {
      error: response.statusText,
    });
  }

  const entities = await response.json();

  res.render('pages/results', {
    entities: entities.items,
  });
});

app.listen(process.env.PORT);