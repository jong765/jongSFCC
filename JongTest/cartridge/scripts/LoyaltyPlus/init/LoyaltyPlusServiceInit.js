'use strict';

const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

exports.LoyaltyPlusService = function (serviceId) {
	return LocalServiceRegistry.createService(serviceId, {

	    createRequest: function(svc, args) {
	        var url                 = svc.configuration.credential.URL + args.urlPath,
	            requestMethod       = args.requestMethod,
	            requiredBodyMethods = ['POST', 'PUT'];
	
	        svc.addHeader('Content-Type', 'application/json');
	        svc.setRequestMethod(requestMethod);
	        svc.setURL(url);
	
	        if (requiredBodyMethods.indexOf(requestMethod) >= 0) {
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
		mockCall: function(svc : HTTPService, client : HTTPClient){
		    return {
				statusCode: 200,
				statusMessage: "Success",
				text: "MOCK RESPONSE (" + svc.URL + ")"
			};
		},
		
	    /**
		 * filterLogMessage() This function filters logs messages if required.
		 */
        filterLogMessage: function(msg : String) {
              return msg.replace("headers", "OFFWITHTHEHEADERS");
        },
        
        /**
		 * getRequestLogMessage() This function handles how the request is
		 * logged.
		 */
        getRequestLogMessage : function(request : Object) : String {
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
        getResponseLogMessage : function(response : Object) : String {
            try {
            	return JSON.stringify(response.text);
            } catch(e) {
            	return;
            }
        }
	});
};