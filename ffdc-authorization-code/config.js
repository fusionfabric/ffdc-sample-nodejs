
module.exports = {
    baseUrl : process.env.BASE_URL,
    callbackUrl : process.env.REDIRECT_URI,
    tokenPath :  process.env.TOKEN_ENDPOINT,    
    authorizePath : process.env.AUTHORIZATION_ENDPOINT,
    scope : process.env.SCOPE,
    client_id : process.env.CLIENT_ID,
    client_secret : process.env.CLIENT_SECRET || '',
    key : process.env.KEYID || '',
    port : process.env.PORT,
    strong : (process.env.STRONG === 'True')
}