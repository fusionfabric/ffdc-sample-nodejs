const openIdClient = require("openid-client")
 
module.exports = function () {
    return openIdClient.Issuer.discover(process.env.AUTHORIZATION_WELLKNOWN)
}
