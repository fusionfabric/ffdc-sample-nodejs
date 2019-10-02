
module.exports = {
    baseUrl : process.env.BASE_URL,
    scope : process.env.SCOPE,
    client_id : process.env.CLIENT_ID,
    client_secret : process.env.CLIENT_SECRET || '',
    key : process.env.KEYID,
    port : process.env.PORT,
    strong : (process.env.STRONG === 'True')
}