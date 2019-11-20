/********************************************************************************************
 *  ReactivateCustomer.js
 *  
 *  Reactivate a paused customer account.
 *
 *   @output externalCustomerId : String
 *   @output success : Boolean
 *   @output data : Object
 *   @output errorMessage : String
 */
'use strict';

var CustomerReactivateService = require('../helper/service/CustomerReactivateService');
var LpResponse = require('../helper/model/LpResponse');
var Util = require('../helper/util/Util');
var logger = require('dw/system/Logger').getLogger("loyaltyplus-error", "ReactivateCustomer.js");

function execute(args) {
	var response = run(args.externalCustomerId);
    args.success = response.success;
    args.data = response.data;
    args.errorMessage = response.errorMessage;
    return response.success ? PIPELET_NEXT : PIPELET_ERROR;
}

function run(externalCustomerId) {
    var response = {};
    try {
        var validationResult = Util.validateRequiredParams({'externalCustomerId':externalCustomerId});
        if (!validationResult.success) {
            return validationResult;
        }
        var result = CustomerReactivateService.run(externalCustomerId);
        if (result.object) {
        	response = new LpResponse(result.object.success, result.object.data, null);
        } else {
        	response = new LpResponse(false, null, result.errorMessage);
        }  
    } catch (e) {
        var exception = e;
        var errMessage = exception.message + "\n" + exception.stack;
        logger.error(errMessage);
        response = new LpResponse(false, null, errMessage);
    }
    logger.debug("response: " + JSON.stringify(response));
    return response;
}

module.exports = {
    'execute': execute,
    'run': run
}