/**
 *  LoyaltyPlusServiceInit.js
 *  
 *  Service init for loyalty plus API's	
 */
'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "LoyaltyPlusServiceInit.js");

exports.LoyaltyPlusService = function (serviceId) {
	return LocalServiceRegistry.createService(serviceId, {

	    createRequest: function(svc, args) {
	        var url                 = svc.configuration.credential.URL + args.urlPath;
	        var requestMethod       = args.requestMethod;
	        
	        svc.addHeader('Content-Type', 'application/json');
	        svc.addHeader('Accept', 'application/json');
	        svc.setRequestMethod(requestMethod);
	        svc.setURL(url);
	
	        logger.debug("requestParam: " + JSON.stringify(args.requestParam));
	        logger.debug("requestBody: " + JSON.stringify(args.requestBody));
	        return JSON.stringify(args.requestBody);
	    },
	
	    parseResponse: function(svc, client) {
			logger.debug("API Response: " + client.text);
	        return JSON.parse(client.text);
	    },
	    
	    /**
		 * mockCall() This function used for returning mocked response when
		 * service is mocked.
		 */
		mockCall: function(svc, client){
		    return {
				statusCode: 200,
				statusMessage: "Success",
				text: "MOCK RESPONSE (" + svc.URL + ")"
			};
		},
		
	    /**
		 * filterLogMessage() This function filters logs messages if required.
		 */
        filterLogMessage: function(msg) {
              return msg.replace("headers", "OFFWITHTHEHEADERS");
        },
        
        /**
		 * getRequestLogMessage() This function handles how the request is
		 * logged.
		 */
        getRequestLogMessage : function(request) {
        	try {
        		return JSON.stringify(request);
        	} catch(e) {
        		return;
        	}
        },
        
        /**
		 * getResponseLogMessage() This function handles how the response is
		 * logged.
		 */
        getResponseLogMessage : function(response) {
            try {
            	return JSON.stringify(response.text);
            } catch(e) {
            	return;
            }
        }
	});
};