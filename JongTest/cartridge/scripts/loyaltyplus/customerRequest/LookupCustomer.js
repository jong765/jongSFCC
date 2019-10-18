/********************************************************************************************
 *  LookupCustomer.js
 *  
 *  Search for customer by email address.
 *
 *   @input emailAddress : String
 *   @output customerFound : Boolean
 *   @output externalCustomerId : String
 *   @output lastVisitDate : String
 *   @output duplicateEmailsFound : Boolean
 *   @output success : Boolean
 *   @output errorMessage : String
 */
'use strict';

var CustomerSearchService = require('../service/CustomerSearchService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "LookupCustomer.js");

function execute(args) {
	var responseObject = run(args.emailAddress);
    args.customerFound = responseObject.customerFound? responseObject.customerFound : null;
    args.externalCustomerId = responseObject.externalCustomerId? responseObject.lpExternalCustomerId : null;
    args.lastVisitDate = responseObject.lastVisitDate? responseObject.lastVisitDate : null;
    args.duplicateEmailsFound = responseObject.duplicateEmailsFound? responseObject.duplicateEmailsFound : null;
    args.success = responseObject.success;
    args.errorMessage = responseObject.errorMessage;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(emailAddress) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'emailAddress':emailAddress});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerSearchService.run(emailAddress);
        if (result.object) {
	        if (result.object.data.length > 1) {
	            responseObject = {success : false,
	                              customerFound : false,
	                              duplicateEmailsFound : true};
	        } else {
	            var data = result.object.data[0];
	            if (data) {
	                responseObject = {success : result.object.success,
	                                  customerFound : true,
	                                  externalCustomerId : data.external_customer_id,
	                                  status : data.status,
	                                  lastVisitDate : data.last_visit_date,
	                                  duplicateEmailsFound : false,
	                                  errorMessage : result.object.data.message};
	            } else {
	                responseObject = {success : result.object.success,
	                                  customerFound : false,
	                                  duplicateEmailsFound : false,
	                                  errorMessage : result.errorMessage};
	            }
	        }
        } else {
        	responseObject = {success : false,
  				              errorMessage : result.errorMessage};
        }   
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        responseObject = {success : false,
        		          errorMessage : errMessage};
    }
    logger.debug("responseObject: " + JSON.stringify(responseObject));
    return responseObject;
}

module.exports = {
    'execute': execute,
    'run': run
}