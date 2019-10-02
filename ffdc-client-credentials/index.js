'use strict';

const fetch = require('node-fetch')
const express = require('express')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const config = require('./config.js')
const uuidv1 = require('uuid/v1')

// any non undefined value in param will force manual client configuration
const issuer = require('./openIdIssuer')()
issuer.defaultHttpOptions = { timeout: 3500 }

const app = express()
global.Headers = fetch.Headers


let client
let access_token
global.strong = config.strong

issuer.then(issuer => {
  client = new issuer.Client({
    client_id: config.client_id,
    client_secret: config.client_secret
  })

  app.listen(config.port, () => console.log(`Sample app listening on port ${config.port}!`))
})

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

// Home page
app.get('/', (req, res) => {
  res.render('pages/index')
})

//Login and get token
app.get('/login', async (req, res, next) => {

  const grant = {
    grant_type: 'client_credentials',
    scope: config.scope
  }

  if (config.strong) {
    // Read private key
    const privateKey = fs.readFileSync('./private.key', 'utf8')

    const payload = {
      jti: uuidv1(),
      exp: Math.floor(Date.now() / 1000) + (30 * 60),
      iss: config.client_id,
      aud: config.baseUrl + '/login/v1',
      sub: config.client_id
    }

    const signOptions = {
      algorithm: "RS256",
      keyid: config.key
    }

    const signature = jwt.sign(payload, privateKey, signOptions)

    grant.client_assertion_type = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
    grant.client_assertion = signature
  }

  // Get token
  try {
    const token = await client.grant(grant)
    access_token = token.access_token
  } catch (e) {
    res.render('pages/error', { error: e })
  }

  // Display access token
  res.render('pages/auth', {
    token: access_token
  })
})

// Get results
app.get('/results', async (req, res, next) => {

  try {
    const response = await fetch(config.baseUrl + "/referential/v1/countries", {
      method: 'get',
      headers: new Headers({
        Authorization: 'Bearer ' + access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

    if (!response.ok) {
      return res.render('pages/error', { error: response.statusText })
    }

    const results = await response.json();

    res.render('pages/results', {
      results: results.countries,
    })
  } catch (err) {
    res.render('pages/error', { error: err })
  }

  app.get('/logout', (req, res) => {
    // Cleanup access token
    access_token = undefined
  
    // Back to index file
    res.render('pages/logout', { logout: "You successfully removed the access token." })
  });

})
