/********************************************************************************************
 *  LookupCustomer.js
 *  
 *  Search for customer by email address.
 *  Error if duplicate customer email addresses are found.
 *
 *   @input emailAddress : String
 *   @output success : Boolean
 *   @output customerFound : Boolean
 *   @output duplicateEmailsFound : Boolean
 *   @output data : Object
 *   @output errorMessage : String
 */
'use strict';

var CustomerSearchService = require('../service/CustomerSearchService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "LookupCustomer.js");

function execute(args) {
	var response = run(args.emailAddress);
    args.success = response.success;
    args.customerFound = response.customerFound;
    args.duplicateEmailsFound = response.duplicateEmailsFound;
    args.data = response.data;
    args.errorMessage = response.errorMessage;
    return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress) {
    var response = {};
    try {
        var validationResult = Util.validateRequiredParams({'emailAddress':emailAddress});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerSearchService.run(emailAddress);
        if (result.object) {
	        if (result.object.data.length > 1) {  // Error if duplicate email addresses found.
	            response = {success : false,
	                        customerFound : false,
	                        duplicateEmailsFound : true,
	                        data : null,
	                        errorMessage : "Error: Duplicate emails found."};
	        } else {
	            var data = result.object.data[0];
	            if (data) {
	                response = {success : result.object.success,
	                            customerFound : true,
	                            duplicateEmailsFound : false,
	                            data : data,
	                            errorMessage : result.errorMessage};
	            } else {
	                response = {success : result.object.success,
	                            customerFound : false,
	                            duplicateEmailsFound : false,
	                            data : null,
	                            errorMessage : result.errorMessage};
	            }
	        }
        } else {
        	response = {success : false,
  				        errorMessage : result.errorMessage};
        }   
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        response = {success : false,
        		    data : null,
        		    errorMessage : errMessage};
    }
    logger.debug("response: " + JSON.stringify(response));
    return response;
}

module.exports = {
    'execute': execute,
    'run': run
}