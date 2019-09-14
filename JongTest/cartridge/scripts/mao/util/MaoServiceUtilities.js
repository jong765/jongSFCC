/**
 * MaoServiceUtilities.js
 *
 */

importPackage( dw.svc );
importPackage( dw.object );

var Site = require('dw/system/Site');
var Class = require('./Class').Class;
var LogUtils = require('./LogUtils.ds');
var Logger = LogUtils.getLogger("MaoServiceUtilities");

var MaoServiceUtilities = Class.extend({

    init : function() {
    },

    createService : function(serviceName, endpointUrl, method) {
        service = ServiceRegistry.get(serviceName);
        service.URL += endpointUrl;
        service.setRequestMethod(method);
        return service;
    },

    setBasicAuthorization : function(service) {
        var username = Site.current.preferences.custom.maoBasicAuthorizationUserName || '';
        var password = Site.current.preferences.custom.maoBasicAuthorizationPassword || '';
        var auth = [username, password].join(':');
        var authCodeByte = dw.util.Bytes(auth);
        var authCode = 'Basic ' + dw.crypto.Encoding.toBase64(authCodeByte);

        service.setAuthentication('BASIC');
        service.addHeader('Authorization', authCode);
    },

    setAuthToken : function(service, requestParams) {
        var authCode = 'Bearer ' + requestParams.token;
        service.setAuthentication('BASIC');
        service.addHeader('Authorization', authCode);
    },

    // If token is not expired, retrieve token from custom object
    // else get new token from MAO and update custom object with new token
    getAccessToken : function() {
        var transaction = require('dw/system/Transaction');
        var tokenValue = null;
        var co = CustomObjectMgr.getCustomObject("mao-api-access-token", "mao-api-access-token");
    
        if (co && co.custom.expireDate > new Date()) {
            tokenValue = co.custom.token;
        } else {
            var token = require('../service/AccessTokenService').getToken();
            tokenValue = token.value;
            function saveToken() {
                var currentDate = new Date();
                var newDate = new Date();
                newDate.setSeconds(currentDate.getSeconds()+token.expires_in);
                co.custom.name = "mao-api-access-token";
                co.custom.token = tokenValue;
                co.custom.expireDate = newDate;
            }
            transaction.wrap(function() {
                if (!co)
                    co = CustomObjectMgr.createCustomObject("mao-api-access-token", "mao-api-access-token");
                saveToken();
            });
        }
        return tokenValue;
    },

    processRequest : function(service, requestBody) {
        var result;
        var counter = 1;
        var mockCall = false;
        var pipelineError = false;
    
        // Execute the request on the service configuration
        function makeCall(svcConfig, params) {
        
            if ( counter == null ){
                counter = 1;
            }
    
            while ( counter != 0 ){
                if ( mockCall ) {
                result = service.setMock().call(params);
                } else if ( pipelineError ) {
                result = service.setThrowOnError().call(params);	
                } else {
                result = service.call(params);
                }
                counter--;
            }
        }

        // Make the service call here
        makeCall(service, requestBody);
    
        if ( service == null || result == null || !result.ok ) {
            Logger.error("Error calling Service: " + result.errorMessage);
            throw new Error("Error calling Service.");
        }
    
        var jsonResponse = JSON.parse(result.object);
    
        return jsonResponse;
    }
});

module.exports = MaoServiceUtilities;