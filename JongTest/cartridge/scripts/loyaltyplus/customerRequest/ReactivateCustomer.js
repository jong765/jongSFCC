/********************************************************************************************
 *  ReactivateCustomer.js
 *  
 *  Reactivate a paused customer account.
 *
 *   @output externalCustomerId : String
 *   @output success : Boolean
 *   @output errorMessage : String
 */
'use strict';

var CustomerReactivateService = require('../service/CustomerReactivateService');
var Util = require('../util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "ReactivateCustomer.js");

function execute(args) {
	var responseObject = run(args.externalCustomerId);
    args.success = responseObject.success;
    args.errorMessage = responseObject.errorMessage;
    return responseObject.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId) {
    var responseObject = {};
    try {
        var validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerReactivateService.run(externalCustomerId);
        if (result.object) {
        	responseObject = {success : result.object.success,
                              errorMessage : null};
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