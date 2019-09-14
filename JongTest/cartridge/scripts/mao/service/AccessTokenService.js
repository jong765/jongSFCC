/**
 * AccessTokenService.js
 * 
 *  Service that generates an access token for MAO API.
 *
 *   @output AccessToken : Object
 *
 */

importPackage( dw.object );

var Site = require('dw/system/Site');
var UrlPath = require('../util/MaoConstants').UrlPath;
var LogUtils = require('../util/LogUtils');
var Logger = LogUtils.getLogger("AccessTokenService");

function execute(args) {
    args.AccessToken = getToken();
    return args.AccessToken ? PIPELET_NEXT : PIPELET_ERROR;
}

// Returns AccessToken object. AccessToken consists of value and expires_in properties.
function getToken() {
    var accessToken = null;
    try {
        var MaoServiceUtilities = require('../util/MaoServiceUtilities');
        var maoServiceUtilities = new MaoServiceUtilities();
        var serviceName = Site.current.preferences.custom.maoAccessTokenServiceName;
        var endpointUrl = UrlPath.ACCESS_TOKEN;
        var method = "POST";
        var service = maoServiceUtilities.createService(serviceName, endpointUrl, method);

        service.addParam("grant_type", "password");
        service.addParam("username", service.configuration.credential.user);
        service.addParam("password", service.configuration.credential.password);
        maoServiceUtilities.setBasicAuthorization(service);

        var response = maoServiceUtilities.processRequest(service, null);
        accessToken = {
            "value" : response.access_token,
            "expires_in" : response.expires_in
        };
    } catch (e) {
        var exception = e;
        var errMessage = "Error in AccessTokenService. " + exception.message + "\n" + exception.stack;
        Logger.error(errMessage);
    }
    return accessToken;
}

module.exports = {
    'execute': execute,
    'getToken': getToken
}