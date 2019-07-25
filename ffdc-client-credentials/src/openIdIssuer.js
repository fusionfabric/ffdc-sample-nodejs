const openIdClient = require("openid-client");
 
module.exports = function (discoveryType = "auto") {
    return openIdClient.Issuer.discover(process.env.AUTHORIZATION_WELLKNOWN);
}
