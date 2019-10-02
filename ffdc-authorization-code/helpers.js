const simpleOauthModule = require('simple-oauth2')
const fs = require('fs')
const config = require('./config.js')
const uuidv1 = require('uuid/v1')

var jwt
var jwtToken
if (config.strong) {
  jwt = require('jsonwebtoken')
  jwtToken = signToken()
}

function getTokenConfig(code){ 
  const options = {
    code,
    redirect_uri: config.callbackUrl
  }

  if (config.strong) {
    options['client_assertion_type'] = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
    options['client_assertion'] = jwtToken
  }

  return options;
}

function oauth2Creation () {
  return simpleOauthModule.create({
    client: {
      id: config.client_id,
      secret: config.client_secret
    },
    auth: {
      tokenHost: config.baseUrl,
      tokenPath: config.tokenPath,
      authorizePath: config.authorizePath
    }
  });
}

// JSON Web Token
function signToken () {
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
    algorithm: 'RS256',
    keyid: config.key
  }

  const jwtToken = jwt.sign(payload, privateKey, signOptions)

  return jwtToken;
}

// Authorization uri
function getAuthUri (oauth2) { 

  const options = {
    redirect_uri: config.callbackUrl,
    scope: config.scope
  }
  
  if (config.strong) {
    options['assertion_type'] = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
    options['assertion'] = jwtToken
  }  
  const authorizationUri = oauth2.authorizationCode.authorizeURL(options)
  return authorizationUri;
}

module.exports = {
  oauth2Creation,
  getTokenConfig,
  getAuthUri
}