/********************************************************************************************
 * 
 *  LoyaltyPlusServiceInit.js
 *  
 *  Description :	Service init for loyalty plus API's
 *  Author 		:	Jong Kim
 *  Date   		:   09/04/2019
 *  
 *  Modification log:
 *  
 *  	
 ********************************************************************************************/
'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "LoyaltyPlusServiceInit.js");

exports.LoyaltyPlusService = function (serviceId) {
	return LocalServiceRegistry.createService(serviceId, {

	    createRequest: function(svc, args) {
	        var url                 = svc.configuration.credential.URL + args.urlPath;
	        var requestMethod       = args.requestMethod;
	        
	        svc.addHeader('Content-Type', 'application/json');
	        svc.setRequestMethod(requestMethod);
	        svc.setURL(url);
	
	        logger.debug("requestParam: " + JSON.stringify(args.requestParam));
	        
	        if (requestMethod === "POST") {
	        	return JSON.stringify(args.request);
	        }
	    },
	
	    parseResponse: function(svc, client) {
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